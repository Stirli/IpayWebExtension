// ==UserScript==
// @name         Плюшки для КШП.бел 4 BETA - last
// @namespace    http://tampermonkey.net/
// @description  Повышает удобство работы администратора с кшп.бел
// 1      1
// @author       Dmitrii Stanski
// @match        https://ipay.znaj.by/*
// @grant        none
// ==/UserScript==

//#region Cookie class definition
class Cookie {

    get name() {
        return this._name;
    }

    constructor(name) {
        this._name = name;
    }

    // возвращает куки с указанным name,
    // или undefined, если ничего не найдено
    getCookie() {
        let name = this._name;
        var matches = document.cookie.match(new RegExp(
            `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1")}=([^;]*)`
        ));

        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(value, options = {}) {
        let name = this._name;
        options.path = "/";
        if (options.lifetime !== undefined) {
            let date = new Date();
            date.setDate(date.getDate() + options.lifetime);
            date = new Date(`${(date.getMonth() + 1)},${date.getDate()},${date.getFullYear()},00:00:00`);
            options.expires = date;
        }

        if (options.expires.toUTCString) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }

    deleteCookie() {
        this.setCookie(this._name, "", {
            'max-age': -1
        })
    }
}

//#endregion Cookie class definition

(function() {
    'use strict';
    /*#region Init*/
 $("body").append(`<style>/*#region style.css CSS*/ #complexSelector input[type='radio'], #cmode input[type='radio'] { opacity: 100 !important; position: initial !important; } td:last-child i { margin-right: 3px } form#form_modal > * { display: inline-block; vertical-align: top } .popup_footer > * { display: block } .popup.popupIpay { width: auto } .content.myinput > * { width: 160px; padding: 10px; margin: 4px } .content.myinput > label { font-weight: 700 } .popup.popupIpay.popupLarge { width: auto !important } #menu_name { margin: 5px 0 0 15px } .popup_footer.editPupilPopupFooter *[class*=button] { margin: 0; width: 100%; margin: 0px 0px 6px 0px } #additionBox { position: fixed; top: 6%; background: white; right: 0; z-index: 999; border: 1px solid } #additionBox input { margin: 0 3px 0px 16px } #complexSelector label { display: block } #add_complex { margin: 7px 0px 7px 0px; padding: 10px; border: 2px dashed #dadada; border-radius: 3px } #cmode input { margin: -7px 5px 0px 0px; vertical-align: middle } li ul > li, #table_add tr td { transition: all 0.2s linear } li ul > li { padding: 1px 9px } li ul > li:hover, #table_add tr:hover td { background: #11c263 } #table_add tr.setn:hover td { color: #ff0 } #className { color: red } /*#endregion A CSS*/ /*#region infoPanel.css*/ #ksa-infoPanel{ float: right; display: flex; } .ksa-selector-box label, .ksa-selector-box select, .ksa-infoPanel-item{ display: inline-block; vertical-align: middle; } .ksa-selector-box{ display: flex; } #ksa-menu-select{ } /*#endregion infoPanel.css*/</style>`);
    /*#endregion Init*/
    
    let cookie = new Cookie("QWERTYUIOOP");
    let val = cookie.getCookie();
    cookie.setCookie(val+1, {lifetime:2});
    console.log(val);
    
 $("header").append(`<div class="row" id="ksa-infoPanel"> <div class="ksa-infopanel-item"> <div class="ksa-selector-box"> <label for="ksa-menu-select"> <span>Действие:</span> </label> <select id="ksa-menu-select"> <option value="1">Сброс</option> <option value="1">БМ</option> <option value="2">БС</option> <option value="3">Комплекс 2</option> </select> </div> </div> <div class="ksa-infopanel-item"> <span> <span>Класс:</span> <span id="ksa-class-name">1А</span> </span> <span> <span>Завтрак:</span> <span id="ksa-breakfast">1</span> </span> <span> <span>Обеды:</span> <span id="ksa-dinner">1</span> </span> <span> <span>Полдник:</span> <span id="ksa-dinner2">1</span> </span> <button>Помощь</button> <button>Настройки</button> </div> </div>`);
    //TODO Сделать класс для подписки на события изменения контента
})();
