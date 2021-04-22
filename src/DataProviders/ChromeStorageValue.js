class ChromeStorageValue {
    _key;
    _type;

    constructor(key, type) {
        this._key = key;
        this._type = type === undefined ? "local" : type;
    }

    set(value) {
        let v = {};
        v[this._key] = value;
        chrome.storage.local.set(v, function (p) {
            console.log(p);
        });
    }

    get(callback) {
        chrome.storage[this._type].get([this._key], function (result) {
            callback(result[this._key]);
        }.bind(this));
    }
}

export {ChromeStorageValue}