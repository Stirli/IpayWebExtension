import { Assert } from "./Assert.mjs";

class Tests {
	/**
	 * @type {Assert}
	 */
	assert;
	constructor() {
		this.assert = new Assert();
		this.assert.testName = this.constructor.name;
	}
	Run() {
		console.log(this.constructor.name + " success");
	}
}
export { Tests };
