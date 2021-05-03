import { Module } from "../../../AddonAPI/Module";

class EatenCalculatorModule extends Module {
	constructor() {
		super();
		console.log("EatenCalculatorModule created");
	}

	onTabChanged(tabName) {
		console.log("onTabChanged: ", tabName);
	}
}
export { EatenCalculatorModule };
