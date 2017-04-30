import { app } from "hyperapp";
import actions from "./actions";
import view from "./view";

app({
	model: {uiStatus: "loading"},
	actions: actions,
	view: view,
	subscriptions: [actions.loadConfig],
	root: document.getElementById("main")
});
