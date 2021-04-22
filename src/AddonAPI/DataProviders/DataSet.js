import { Document } from "./Document.mjs";

class DataSet {
	name;

	constructor(name) {
		if (name === undefined) {
			throw `Undefined name for DataSet`;
		}

		this.name = name;
	}

	/**
	 * Inserts one or many documents
	 * @param document document to insert
	 * @param {Function} callback function (result : bool) : void
	 */
	insert(document, callback) {}

	/**
	 * Finds Documents in data set
	 * @param document template to find
	 * @param {Function} callback function (documents : Array) : void
	 */
	find(document, callback) {}
}

export { DataSet };
