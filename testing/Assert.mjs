class Assert {
	testName;
	equals(expected, actual, tag = "equals") {
		if (expected != actual) {
			throw `${this.testName} ${tag} failed`;
		}
	}
}
export { Assert };
