//#region Cookie class definition
class Cookie {

    _local;
    _options;

    get name() {
        return this._name;
    }

    /**
     * Creates Cookie object
     * @param name
     * @param {CookieOptions} options
     */
    constructor(name, options) {
        this._options = options;
        this._name = name;
        this._local = this.getCookie();
    }

    get local() {
        return this._local;
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

    /**
     * Sets cookie
     * @param value
     * @param {CookieOptions} options
     */
    setCookie(value, options) {
        let name = this._name;
        if (options === undefined) {
            options = this._options;
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";" + options.toString();

        document.cookie = updatedCookie;
        this._local = value;
    }

    deleteCookie() {
        this._options.maxAge = 0;
        this.setCookie("");
        this._local = undefined;
    }
}

//#endregion Cookie class definition