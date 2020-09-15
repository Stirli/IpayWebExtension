class Menu extends Array {
    _menu;
    _date;

    constructor(date) {
        super();
        this._date = date;
    }

    find(id) {
        for (let i = 0; i < this.length; i++) {
            if (this[i].name == id) {
                return this[i];
            }
        }
    }

    load(callback) {
        console.log("start menu loading");
        this._menu = new ChromeStorageValue("menu" + this._date());
        this._menu.get(function (val) {
            if (val === undefined) {
                this.length = 0;
            } else {
                let jmenu = val;
                if (jmenu !== undefined) {
                    this.length = 0;
                    for (let i = 0; i < jmenu.length; i++) {
                        this.push(jmenu[i]);
                    }
                }
            }
            
            callback();
        }.bind(this));       
    }

    save() {
        if (this._menu === undefined) {
            this._menu = new ChromeStorageValue("menu" + this._date());
        }
        
        this._menu.set(this);
    }
}