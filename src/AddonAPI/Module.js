import { ModuleStorage } from "./DataProviders/ModuleStorage";
import { PageContext } from "./PageContext";

class Module {
	/**
	 * @param {PageContext} pageContext
	 * @param {ModuleStorage} storage
	 */
	onStart(pageContext, storage) {}
	/**
	 * @param {string} tabName
	 */
	onTabChanged(tabName) {}
	onPageRefreshing() {}
	onDisable() {}
}

export { Module };
