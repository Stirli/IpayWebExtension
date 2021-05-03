import { Document } from "./Document";

class DataSet {
	name;
	dataContext;

	constructor(name, dataContext) {
		if (name === undefined) {
			throw `Undefined name for DataSet`;
		}

		this.name = name;
		this.dataContext = dataContext;
	}

	/**
	 * Inserts one or many documents
	 * @param {Document} document document to insert
	 * @param {Function} callback function (result : bool) : void
	 */
	insert(document, callback) {}

	/**
	 * Finds Documents in data set
	 * @param {Document} document template to find
	 * @param {Function} callback function (documents : Array) : void
	 */
	find(document, callback) {}
}

export { DataSet };
