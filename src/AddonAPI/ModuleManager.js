import { PageContext } from "./PageContext";
import { Module } from "./Module";
import { DataContext } from "./DataProviders/DataContext";

class ModuleManager {
	/** @type {Array} */
	#modules;
	/** @type {PageContext} */
	#pageContext;
	/** @type {DataContext} */
	#dataContext;
	constructor(dataContext) {
		this.#modules = [];
		this.#dataContext = dataContext;
	}

	start() {
		this.#pageContext = new PageContext();
		for (let [, module] of Object.entries(this.#modules)) {
			module.onStart(this.#pageContext, this.#dataContext);
		}
	}

	registerModule(ModuleType) {
		//TODO check object already exists
		if (this.#modules[ModuleType.name] !== undefined) {
			console.error(`${ModuleType} is already registered. Skipping...`);
		} else {
			this.#modules[ModuleType.name] = new ModuleType();
		}
		console.log("modules:", this.#modules);
	}
}

export { ModuleManager };
