const handleFetchErrors = (response) => {
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response;
}

const loadConformance = (name, sandbox, actions) => {
	const params = {
		method:"GET", mode: "cors", redirect: "follow", 
		headers: {"accept": "application/json+fhir"}
	};

	return fetch(sandbox.conformance, params)
		.then( handleFetchErrors )
		.then( response => response.json() )
		.then( json => {
			actions.addConformance({name: name, conformance: json});
		})
		.catch( err => { 
			actions.setSandboxStatus({name: name, error: err.message});
		})
}

const loadConfig = (model, actions) => {
	const configUrl = 
		`config${window.location.href.indexOf("dev") > -1 ? ".dev" : ""}.json`;
	return fetch(configUrl)
		.then( handleFetchErrors )
		.then( response => response.json() )
		.then( config => {
			actions.setConfig(config);
			return config;
		})
		.then( config => {
			loadSandboxes(config, actions);
		})
		.catch( err => { 
			actions.setUiStatus({status: "configError", message: err.message});
		})
}

const loadSandboxes = (config, actions) => {
	config.columns.forEach( c => {
		if (config.sandboxes[c] && !config.sandboxes[c].loaded)
			loadConformance(c, config.sandboxes[c], actions) 
	});
}

const actions = {
	loadConfig: loadConfig,

	setConfig: (model, config, actions) => {
		return {config: config, uiStatus: "ready"};
	},

	setUiStatus: (model, {status, message}) => {
		return {uiStatus: status, uiMessage: message}
	},

	setColumn: (model, {colNumber, value}, actions) => {
		if (value == "-") value = null;

		if (value && !model.config.sandboxes[value].loaded)
			loadConformance(value, model.config.sandboxes[value], actions);

		return {config: {
			...model.config,
			columns: [0,1,2].map( 
				(i) => (i == colNumber) ? value : model.config.columns[i] || null
			)
		}}
	},

	setSandboxStatus: (model, {name, error}) => {
		const sandboxes = {
			...model.config.sandboxes,
			[name]: {
				...model.config.sandboxes[name],
				loaded: true,
				error: error
			}
		};
		return {config: {
			...model.config, 
			sandboxes: sandboxes
		}};
	},

	toggleExpanded: (model, {targetType, targetValue, expansionType}) => {
		return {[targetType]: {
			...model[targetType],
			[targetValue]: {
				...model[targetType][targetValue],
				[expansionType]: !model[targetType][targetValue][expansionType]
			}
		}}
	},

	addConformance: (model, {name, conformance}, actions) => {

		const _mergeFeature = (featureName, value) => {
			return {
				...(model.featureSupport || {})[featureName],
				[name]: value
			}
		}

		const smartSupport = (
			conformance.rest[0].security &&
			conformance.rest[0].security.service &&
			conformance.rest[0].security.service.find( s => {
				return s.coding.find( c => c.code == "SMART-on-FHIR" )
			})
		) ? true : false;

		const featureSupport = {
			"FHIR Version": 
				_mergeFeature("FHIR Version", conformance.fhirVersion),
			"XML Format": 
				_mergeFeature("XML Format", conformance.format.join().indexOf("xml") > -1),
			"JSON Format": 
				_mergeFeature("JSON Format", conformance.format.join().indexOf("json") > -1),
			"SMART": 
				_mergeFeature("SMART", smartSupport)
		};

		const resourceSupport = { ...model.resourceSupport };
		conformance.rest[0].resource.forEach( (resource) => {
			if ((model.config.ignoreResources || []).indexOf(resource.type) > -1) return;
			resourceSupport[resource.type] = {
				...resourceSupport[resource.type],
				[name]: {
					interaction: resource.interaction,
					documentation: resource.documentation
				}
			}

			if (!resource.searchParam || !resource.searchParam.length) return;
			const searchParam = resourceSupport[resource.type].searchParam || {};
			resource.searchParam.forEach( (param) => {
				const paramTitle = `${param.name}+${param.type}`;
				searchParam[paramTitle] = {
					...searchParam[paramTitle],
					[name]: {documentation: param.documentation}
				}
			});
			resourceSupport[resource.type].searchParam = searchParam;
		});
		const sandboxes = {
			...model.config.sandboxes,
			[name]: {
				...model.config.sandboxes[name],
				loaded: true,
				error: null,
			}
		};
		const config = {
			...model.config, 
			sandboxes: sandboxes
		};
		return {
			config: config,
			featureSupport: featureSupport,
			resourceSupport: resourceSupport
		}
	}
}

module.exports = actions;