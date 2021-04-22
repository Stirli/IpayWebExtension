import { Document } from "../src/AddonAPI/DataProviders/Document.mjs";
import { Tests } from "./Tests.mjs";

class A extends Document {
	name;
	age;
	constructor(name, age) {
		super();
		this.name = name;
		this.age = age;
	}
}

class DocumentTests extends Tests {
	constructor() {
		super();
	}
	Run() {
		let a = new A(
			{ name: { name: "Bob" }, lastName: "Johnson" },
			{ ageNum: 5 }
		);
		this.assert.equals(
			"{   _id : undefined,   name : {   name : {   name : Bob },   lastName : Johnson },   age : {   ageNum : 5 } }",
			a.toString(),
			"#toString()"
		);
		this.assert.equals(
			"{\n  _id : undefined,\n  name : {\n    name : {\n      name : Bob\n    },\n    lastName : Johnson\n  },\n  age : {\n    ageNum : 5\n  }\n}",
			a.pretty(),
			"#pretty()"
		);
		super.Run();
	}
}

export { DocumentTests };
