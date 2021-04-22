class InfoPanelModule{
    _box;

    /**
     * @param {JQuery} parent
     */
    constructor(parent) {
        this._parent = parent;
    }

    init(callback){
        let url = chrome.extension.getURL('Content/components/infoPanel/infoPanel.html');
        let cssurl = chrome.extension.getURL('Content/components/infoPanel/infoPanel.css');
        this._box = $(`<div class="content" id="additionBox"></div>`);
        this._box.load(url, ()=>{
            this._box.append($('<link rel="stylesheet" type="text/css" />').attr('href', cssurl));
            callback(this._box);
        });
    }
}

export {InfoPanelModule}