class DataContext {
	/**@type {{isEnabled:boolean}} */
	settings;
	/**@type {chrome.storage.StorageArea} */
	#storage;
	constructor() {
		this.#storage = chrome.storage["local"];
	}

	load(callback) {
		this.settings = { isEnabled: false };
		this.#storage.get((items) => {
			for (const key in items) {
				if (Object.hasOwnProperty.call(items, key)) {
					const element = items[key];
					this[key] = element;
				}
			}

			if (callback !== undefined) callback();
		});
	}

	saveContext(callback) {
		let keys = Object.keys(this);
		for (let index = 0; index < keys.length; index++) {
			const key = keys[index];
			this.#storage.set({ [key]: this[key] }, () => {
				if (callback !== undefined && index == keys.length - 1) {
					callback();
				}
			});
		}
		for (const key in this) {
			if (Object.hasOwnProperty.call(this, key)) {
				const element = this[key];
				this.#storage.set({ [key]: element });
			}
		}
	}

	InsertValue(collectionName, document, callback) {}
	FindValue(collectionName, document, callback) {}
}
export { DataContext };
