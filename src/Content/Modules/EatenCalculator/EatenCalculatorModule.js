import { Module } from "../../../AddonAPI/Module";
import { PageContext } from "../../../AddonAPI/PageContext";
class EatenCalculatorModule extends Module {
	/**
	 * @type {PageContext}
	 */
	#pageContext;

	/**
	 * @param {PageContext} pageContext
	 */
	onStart(pageContext) {
		this.#pageContext = pageContext;
	}

	onTabChanged(tabName) {
		console.log(tabName);
	}
}
export { EatenCalculatorModule };
