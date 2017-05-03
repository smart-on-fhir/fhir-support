import { h } from "hyperapp";

module.exports = {
	loading: 
		<div>Loading...</div>,
	
	loadingSpinner: 
		<span>
			<i class="fa fa-spinner fa-spin fa-fw"></i>
			<span class="sr-only">Loading...</span>
		</span>,
	
	pageHeader:
		<div className="row page-title"><div className="col-xs-12">
			<img src="./fhir.png" />
			<h1>EHR FHIR Support</h1>
			<p>Reflects a real-time view of each sandbox's published conformance metadata (does not guarantee actual conformance)</p>
		</div></div>,
	
	emptyCell:
		<span></span>,
	
	footer:
		<div>
			<div className="row key">
				<div className="col-xs-12">
					<i className="fa fa-fw fa-file-o"></i> = read
					&nbsp;|&nbsp;
					<i className="fa fa-fw fa-search"></i> = search
					&nbsp;|&nbsp;
					<i className="fa fa-fw fa-plus"></i> = create
					&nbsp;|&nbsp;
					<i className="fa fa-fw fa-pencil"></i> = update
					&nbsp;|&nbsp;
					<i className="fa fa-fw fa-trash"></i> = delete
					&nbsp;|&nbsp;
					* = non-vendor note
				</div>
			</div>
			<div className="row key">
				<div className="col-sm-12">
					This is project of <a href="https://smarthealthit.org" target="_blank">
					SMART Health IT</a> and the code that generates this page is available on <a
					href="https://github.com/smart-on-fhir/fhir-support" target="_blank">Github</a>
					. To stay updated on the project, please follow <a
					href="https://twitter.com/intent/user?screen_name=gotdan" target="_blank"
					>@gotdan</a> and <a href="https://twitter.com/intent/user?screen_name=smarthealthit"
					target="_blank">@smarthealthit</a> on twitter.
				</div>
			</div>
		</div>,	

	error: (message) => {
		return <div className="row">
			<div className="col-xs-12">
				<div className="alert alert-warning text-left">
					{message}
				</div>
			</div>
		</div>
	},
	
	link: ( {label, href} ) => {
		return <a target="_blank" href={href}>{label}</a>
	},
	
	toggle: ( {label, clickHandler} ) => {
		return <a className="toggle" href="#" onClick={clickHandler}>{label}</a>
	},
	
	column: ( {width, body, key, className} ) => {
		className =`col-xs-${width} ${className || ""}`;
		return <div key={key} className={className}>
			{body}
		</div>
	},
	
	titleColumn: (body) => {
		return <div className="col-xs-3 row-title">
			{body}
		</div>	
	},
	
	row: ( {body, className=""} ) => {
		return <div class={`row ${className}`}>
			{body}
		</div>
	},
	
	multipartTitle: ( {primary, secondary, className} ) => {
		return <span className={className}>
			{primary}&nbsp;{secondary}
		</span>
	},
	
	note: (body) => {
		return <li>{body}</li>
	},
	
	notes: (notes) => {
		return <div className="col-xs-12">
			<ul className="noteList">
				{notes}
			</ul>
		</div>
	},
	
	button: ( {label, clickHandler} ) => {
		return <a class="btn btn-primary" taget="#" onClick={clickHandler}>{label}</a>
	},
	
	fa: ( {icon, visible, title, fixedWidth, spaceAfter} ) => {
		const className = `fa fa-${icon} ${fixedWidth ? "fa-fw" : ""} ${visible ? "" : "invisible"}`;
		return <i className={className} title={title}></i>
	},
	
	select: ( {changeHandler, options} ) => {
		return <div className="col-xs-3">
			<select className="form-control" onChange={changeHandler}>
				{options}
			</select>
		</div>
	},
	
	selectOption: ( {name, value, selected} ) => {
		name = name || value;
		return <option value={value} selected={selected}>{name}</option>
	}
}
