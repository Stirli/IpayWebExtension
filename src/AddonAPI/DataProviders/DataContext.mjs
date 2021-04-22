class DataContext {
	constructor() {
		for (const key in this) {
			if (Object.hasOwnProperty.call(this, key)) {
				this[key] = new this[key](key, this);
			}
		}
	}

    InsertValue(collectionName, document, callback){
        chrome
    }
    FindValue(collectionName, document, callback){}
}
exports {DataContext}