import { h } from "hyperapp";
import components from "./components";

const getCustomNote = (model, sandbox, path) => {
	if (!sandbox) return;

	if (!model.config.sandboxes[sandbox].notes) {
		return null;
	} else {
		return model.config.sandboxes[sandbox].notes[
			path.join("/").toLowerCase().replace(/\s+/g, "-")
		]
	}
}

const mapColumns = (model, fn) => {
	const _getColSandboxes = (model, includeNull) => {
		return model.config.columns
			.filter(c => includeNull ? true : c)
			.slice(0,3);
	}
	
	const sandboxes = _getColSandboxes(model, model.uiStatus == "edit_columns");
	const colWidth = model.uiStatus == "edit_columns" ? 3 : Math.floor(9/sandboxes.length);
	return sandboxes.map( (sandbox, i) => fn(sandbox, i, colWidth) );	
}

const renderConformanceErrors = (model, actions) => {
	return mapColumns(model, (sandbox) => {
		if (model.config.sandboxes[sandbox] && model.config.sandboxes[sandbox].error) {
			return components.error(
				`Error loading ${sandbox} conformance statement: ${model.config.sandboxes[sandbox].error}`
			)
		};
	});
}

const renderHeaderRow = (model, actions) => {
	if (model.uiStatus == "edit_columns") {
		return renderEditableHeaderRow(model, actions);
	} else {
		return renderStaticHeaderRow(model, actions);
	}
}

const renderStaticHeaderRow = (model, actions) => {
	const _editColumns = e => {
		actions.setUiStatus({status: "edit_columns"});
		e.preventDefault();
	}

	const columns = mapColumns(model, (sandbox, i, colWidth) => {
		const value = components.link({label: sandbox, href: model.config.sandboxes[sandbox].documentation})
		return components.column({width:colWidth, body:value, key:i});
	});
	const title = components.titleColumn(
		components.toggle({label:"edit columns", clickHandler: _editColumns})
	);
	return components.row({className: "header", body:[title, columns]});
}

const renderEditableHeaderRow = (model, actions) => {
	const _endEdit = e => {
		actions.setUiStatus({status: "ready"})
		e.preventDefault()
	}

	const allSandboxes = Object.keys(model.config.sandboxes);
	const columns = [0,1,2].map( colNumber => {
		const _handleChange = (e) => {
			actions.setColumn({colNumber:colNumber, value: e.target.value})
		}
		const selected = model.config.columns[colNumber];
		const options = allSandboxes.map( sandbox => {
			return components.selectOption({value:sandbox, selected: selected == sandbox})
		});
		options.unshift( components.selectOption({value:"-",  selected: !selected}) );
		return components.select({options:options, changeHandler: _handleChange});
	})

	const button = components.titleColumn(
		components.button({label:"Done", clickHandler:_endEdit})
	);

	return components.row({className: "header", body:[button, columns]})
}

const renderLoadingRow = (model) => {
	const columns = mapColumns(model, (sandbox, i, colWidth) => {
		let body;
		if (model.config.sandboxes[sandbox] && !model.config.sandboxes[sandbox].loaded) {
			body = components.loadingSpinner;
		}
		return components.column({width: colWidth, body: body, key:i});
	});
	return components.row({body:[components.titleColumn(""), columns]});
}

const renderSubheadRow = (title) => {
	return components.row({
		body: components.column({width:12, body:title, className: "subhead"})
	})
}

const renderBinaryCell = (value) => {
	if (value) {
		return <span>{components.fa({ icon:"check", title:"yes" })}</span>
	} else if (value === false) {
		return <span>{components.fa({ icon:"times", title:"no" })}</span>
	} else {
		return "-"
	}
}

const renderRowTitle = (model, actions, name, type, hasNotes, notesVisible, hasParams, paramsVisible) => {
	const _toggleNotes = (e) => {
		actions.toggleExpanded({targetType: type, targetValue: name, expansionType: "notesVisible" });
		e.preventDefault();
	}
	const _toggleParams = (e) => {
		actions.toggleExpanded({targetType: type, targetValue: name, expansionType: "paramsVisible" });
		e.preventDefault();
	}

	let paramsToggle, notesToggle;
	if (hasParams) {
		const paramsLabel = model[type][name].paramsVisible ? "params [-]" : "params";
		paramsToggle = components.toggle({label: paramsLabel, clickHandler: _toggleParams});
	}
	if (hasNotes) {
		const notesLabel = model[type][name].notesVisible ? "notes [-]" : "notes";
		notesToggle = components.toggle({label: notesLabel, clickHandler: _toggleNotes});
	}

	return components.titleColumn([
		name,
		(hasNotes || hasParams) ? " " : null,
		paramsToggle,
		(hasNotes && hasParams) ? " | " : null,
		notesToggle
	]);
}

const renderRowNote = (sandbox, text, isCustom) => {
	return components.note(`${sandbox}${isCustom ? "*" : ""}: ${text}`);
}

const renderFeatureRows = (model, actions) => {
	if (!model.featureSupport) return;

	const rows = [
		{type: "text", name: "FHIR Version"}, {name: "JSON Format"}, 
		{name: "XML Format"}, {name: "SMART"}
	];

	const _notesRenderer = (model, sandbox, name) => {
		const notes = [];
		let note = getCustomNote(model, sandbox, ["feature", name])
		if (note) notes.push( renderRowNote(sandbox, note, true) )
		note = model.featureSupport[name][sandbox] && 
			model.featureSupport[name][sandbox].documentation;
		if (note) notes.push( renderRowNote(sandbox, note) )
		return notes;
	}

	const _cellRenderer = (model, sandbox, feature, colWidth, key) => {
		let body = model.featureSupport[feature.name][sandbox];
		if (feature.type != "text") 			
			body = renderBinaryCell(body);
		return components.column({ width:colWidth, body, key });
	}

	return rows.map( (feature, i) => {
		const name = feature.name;
		let notes = [];
		const columns = mapColumns(model, (sandbox, j, colWidth) => {
			const sandboxNotes = _notesRenderer(model, sandbox, name);
			notes = notes.concat(sandboxNotes);
			return _cellRenderer(model, sandbox, feature, colWidth, j);
		});
		const hasNotes = notes.length > 0;
		const notesVisible = model.featureSupport[name].notesVisible;
		const title = renderRowTitle(model, actions, name, "featureSupport", hasNotes, notesVisible);
		const renderedNotes = hasNotes && notesVisible ? components.notes(notes) : null;

		return components.row({
			className: (i%2 ? "zebra data" : "data"), key:i,
			body: [title, columns, renderedNotes]
		});
	})

}

const renderResourceCell = (resourceDetail) => {
	const codeToIcon = [
		["read", "file-o"],["search-type", "search"],
		["create", "plus"], ["update", "pencil"], ["delete", "trash"]
	];

	if (!resourceDetail || !resourceDetail.interaction || !resourceDetail.interaction.length) {
		return components.emptyCell;
	}

	return codeToIcon.map( (i, k) => {
		const visible = (resourceDetail.interaction.find( c => c.code === i[0] ))
		return components.fa({icon: i[1], visible: visible, title: i[0], fixedWidth:true, spaceAfter: k < codeToIcon.length-1})
	})
}

const renderParamRows = (model, resource, notesVisible, className) => {

	const _cellRenderer = (model, sandbox, resource, param, colWidth, key) => {
		let value;
		if (!model.resourceSupport[resource][sandbox]) {
			value = null;
		} else if (model.resourceSupport[resource].searchParam[param][sandbox]) {
			value = true;
		} else {
			value = false;
		}
		return components.column(
			{width:colWidth, body:renderBinaryCell(value), key:key}
		);
	}

	const _notesRenderer = (model, sandbox, resource, param) => {
		const notes = [];
		let note = getCustomNote(model, sandbox, ["resource", resource, param])
		if (note) notes.push( renderRowNote(sandbox, note, true) )
		note = model.resourceSupport[resource].searchParam[param][sandbox] && 
			model.resourceSupport[resource].searchParam[param][sandbox].documentation;
		if (note) notes.push( renderRowNote(sandbox, note) )
		return notes;
	}

	const _titleRenderer = (model, paramName) => {
		paramName = paramName.split("+")
		return components.titleColumn(
			components.multipartTitle({
				primary: components.fa({icon:"search", title: "search parameter", fixedWidth: true}),
				secondary: `${paramName[0]} (${paramName[1]})`,
				className: "param-title"
			})
		);
	}

	let hasParamNotes;
	const rows = Object.keys(model.resourceSupport[resource].searchParam).sort().map( (param, i) => {
		let notes = [];
		const columns = mapColumns(model, (sandbox, j, colWidth) => {
			const sandboxNotes = _notesRenderer(model, sandbox, resource, param);
			notes = notes.concat(sandboxNotes);
			return _cellRenderer(model, sandbox, resource, param, colWidth, j);
		});
		const title = _titleRenderer(model, param);
		if (notes.length > 0) hasParamNotes = true;
		const renderedNotes = notesVisible && notes.length > 0 ? components.notes(notes) : null;
		return components.row({
			className: className, body: [title, columns, renderedNotes], key: i
		});
	});

	return {rows, hasNotes:hasParamNotes}
}

const renderResourceRows = (model, actions) => {
	if (!model.resourceSupport) return;

	const _notesRenderer = (model, sandbox, resource) => {
		const notes = [];
		let note = getCustomNote(model, sandbox, ["resource", resource]);
		if (note) notes.push( renderRowNote(sandbox, note, true) )
		note = model.resourceSupport[resource][sandbox] && 
			model.resourceSupport[resource][sandbox].documentation;
		if (note) notes.push( renderRowNote(sandbox, note) )
		return notes;
	}

	const _cellRenderer = (model, sandbox, resource, colWidth, key) => {
		const value = renderResourceCell(model.resourceSupport[resource][sandbox]);
		return components.column({
			width:colWidth, 
			body:value,
			key:key
		});
	}

	return Object.keys(model.resourceSupport).sort().map( (resource, i) => {
		let notes = [];
		let hasContent;
		const columns = mapColumns(model, (sandbox, j, colWidth) => {
			if (model.resourceSupport[resource][sandbox]) hasContent = true;
			const sandboxNotes = _notesRenderer(model, sandbox, resource);
			notes = notes.concat(sandboxNotes);
			return _cellRenderer(model, sandbox, resource, colWidth, j);
		});
		
		//after removing column, may still have keys but no longer used
		if (!hasContent) return;

		const hasResourceNotes = notes.length > 0;
		const notesVisible = model.resourceSupport[resource].notesVisible;
		const className =  i%2 ? "zebra data" : "data";

		const hasParams = model.resourceSupport[resource].searchParam ? true : false;
		const paramsVisible = model.resourceSupport[resource].paramsVisible;

		let paramRows = [];
		let hasParamNotes = false;
		if (paramsVisible) {
			const paramDetails = renderParamRows(model, resource, notesVisible, className);
			paramRows = paramDetails.rows;
			hasParamNotes = paramDetails.hasNotes;
		}

		const hasNotes = hasResourceNotes || hasParamNotes;
		const title = renderRowTitle(model, actions, resource, "resourceSupport", 
			hasNotes, notesVisible, hasParams, paramsVisible);
		const renderedNotes = hasResourceNotes && notesVisible ? components.notes(notes) : null;
		const resourceRow = components.row({
			className: className, body: [title, columns, renderedNotes], key:i
		});
		return [resourceRow, paramRows]
	
	})

}


const view = (model, actions) => {
	if (model.uiStatus == "loading") {
		return components.loading;
	} else if (model.uiStatus == "configError") {
		return components.error(`Error loading config file: ${model.uiMessage}`);
	}

	return <div>
		{components.pageHeader}
		{renderConformanceErrors(model)}
		{renderHeaderRow(model, actions)}
		{renderLoadingRow(model)}
		<div className="section">
			{renderSubheadRow("Support:")}
			{renderFeatureRows(model, actions)}
		</div><div className="section">
			{renderSubheadRow("Resources:")}
			{renderResourceRows(model, actions)}
		</div>
		{components.footer}
	</div>

}

module.exports = view;
