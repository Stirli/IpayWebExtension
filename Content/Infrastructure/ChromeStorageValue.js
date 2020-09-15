class ChromeStorageValue{
    _key;
    constructor(key){
        this._key = key;
    }
    
    set (value){
        let v = {};
        v[this._key] = value;
        chrome.storage.local.set(v, function (p) {
            console.log(p);
        });
    }
    get(callback){
        chrome.storage.local.get([this._key], function (result) {
            callback(result[this._key]);
        }.bind(this));
    }
}