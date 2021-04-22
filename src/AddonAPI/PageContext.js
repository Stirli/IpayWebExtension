import { AddonMutationObserver } from "./AddonMutationObserver";
class PageContext {
	#observer;
	#onPageTabChangedCallbacks;

	constructor() {
		this.#observer = new AddonMutationObserver();
		this.#onPageTabChangedCallbacks = [];
		let page = document.getElementsByClassName("page-content");
		if (page.length > 0) {
			page = page[0].getElementsByClassName("col-75");
			if (page.length > 0) {
				page = page[0];
				const config = {
					attributes: false,
					childList: true,
					subtree: false,
				};
				this.#observer.addObserver(
					page,
					function (e) {
						console.log(e);
						$(this.#onPageTabChangedCallbacks).each(function () {
							let text = document.getElementsByClassName(
								"kvp-menu selected"
							)[0].innerText;
							this(text);
						});
					}.bind(this),
					config
				);
				return;
			}
		}

		throw "cannot find .page-content .col-75";
	}

	onPageTabChanged(callback) {
		this.#onPageTabChangedCallbacks.push(callback);
	}
}

export { PageContext };
