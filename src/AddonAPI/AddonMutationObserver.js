class AddonMutationObserver {
	#observers;

	constructor() {
		this.#observers = [];
	}

	/**
	 * @param {Node} target
	 * @param {MutationCallback} callback
	 * @param {MutationObserverInit} config
	 * @return {MutationObserver}
	 */
	addObserver(target, callback, config) {
		let observer = this.#observers[target];
		if (observer === undefined) {
			observer = this.#observers[target] = new MutationObserver(callback);
			console.log(target);
			console.log(observer);
			observer.observe(target, config);
		} else {
			console.error(`Observer ${target} already exists`);
		}

		return observer;
	}

	/**
	 *
	 * @param {Node} key
	 */
	killObserver(key) {
		if (this.#observers[key] !== undefined) {
			this.#observers[key].disconnect();
		}
	}
}

export { AddonMutationObserver };
