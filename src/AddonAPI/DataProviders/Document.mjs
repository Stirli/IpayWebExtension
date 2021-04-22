class Document {
	_id;
	constructor() {}

	static objectToString(obj, level) {
		let oneTab = "  ";
		let tab = oneTab.repeat(level);
		let spaceOrNewline =
			typeof level === "number" && !isNaN(level) ? "\n" : " ";
		return (
			"{" +
			spaceOrNewline +
			Object.keys(obj)
				.map((k) => {
					let val = obj[k];
					if (typeof val === "object" && val !== null) {
						val = Document.objectToString(val, level + 1);
					}

					return oneTab + tab + `${k} : ${val}`;
				})
				.join("," + spaceOrNewline) +
			spaceOrNewline +
			tab +
			"}"
		);
	}

	toString() {
		return Document.objectToString(this);
	}

	pretty() {
		return Document.objectToString(this, 0);
	}
}
export { Document };
