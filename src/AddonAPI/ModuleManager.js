import { PageContext } from "./PageContext";
import { ModuleManager } from "./Module";

class ModuleManager {
	/**
	 * @type {Array}
	 */
	#modules;
	/**
	 * @type {PageContext}
	 */
	#pageContext;
	constructor() {
		this.#modules = [];
	}

	start() {
		this.#pageContext = new PageContext();
		this.#modules.forEach((module) => {
			module.onStart(this.#pageContext);
		});
	}

	registerModule(ModuleType) {
		//TODO check object already exists
		if (this.#modules[ModuleType] !== undefined)
			console.error(`${ModuleType} is already registered. Skipping...`);
		else this.#modules[ModuleType] = new ModuleType(new Chrome());
	}
}

let moduleManager = new ModuleManager();

export { moduleManager };
