class MyIpay {
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
    observe(target, callback, config) {
        let callback_wrap = (m) => {
            if(this.targets[target]===undefined){
                this.targets[target] =
            }
            callback(m, this);
            console.log(this);
            this.prevMutation = b ? undefined : m;
        }
        let observer = this.#observers[target] = new MutationObserver(callback_wrap);
        observer.targets = [];
        observer.observe(target, config);
        return observer;
    }

    /**
     *
     * @param {Node} target
     */
    unobserve(target) {
        this.#observers[target].disconnect();
    }

    #prevMutation;

    /**
     *
     * @param target jquery selector string, DOM Node or jQuery object
     * @param callback
     */
    observeForChildren(target, callback) {
        if (target instanceof Node) {
            this.observe(target, callback, {childList: true, subtree: false});
        } else if (target instanceof jQuery) {
            target.each((i, v) => {
                this.observeForChildren(v, callback);
            });
        } else if (typeof target === "string" || target instanceof String) {
            this.observeForChildren($(target), callback);
        }
    }
}

let myIpay = new MyIpay();

export {myIpay}