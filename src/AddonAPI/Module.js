import { DataContext } from "./DataProviders/DataContext";
import { PageContext } from "./PageContext";

class Module {
	_pageContext;
	_dataContext;

	/**
	 * @param {PageContext} pageContext
	 * @param {DataContext} dataContext
	 */
	onStart(pageContext, dataContext) {
		this._pageContext = pageContext;
		this._pageContext.onPageTabChanged(this.onTabChanged.bind(this));
		this._dataContext = dataContext;
		console.log("On module start:", this._pageContext, this._dataContext);
	}
	/**
	 * @param {string} tabName
	 */
	onTabChanged(tabName) {
		console.log("Base tabchanged processor");
	}
	onPageRefreshing() {}
	onDisable() {}
}

export { Module };
