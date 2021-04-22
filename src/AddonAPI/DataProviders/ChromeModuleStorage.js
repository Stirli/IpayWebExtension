import { ChromeStorageValue } from "../../DataProviders/ChromeStorageValue";

class ChromeModuleStorage extends ModuleStorage {
	name;
	constructor(name) {
		this.name = name;
	}
	set(key, value, callback) {}
	get(key, callback) {}
}
