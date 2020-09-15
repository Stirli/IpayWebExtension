class CookieOptions {
    _path;
    _expires;
    _maxAge;

    constructor() {
        this._path = '/';
        this._maxAge = 0;
    }

    get path() {
        return this._path;
    }

    get expires() {
        return this._expires;
    }

    set expires(value) {
        this._maxAge = undefined;
        this._expires = value;
    }
    
    get maxAge() {
        return this._maxAge;
    }

    set maxAge(value) {
        this._expires = undefined;
        this._maxAge = value;
    }

    /**
     * Set lifetime in days
     * @param {number} days
     */
    setLifeTime(days) {
        this._expires = undefined;
        this._maxAge = days * 24 * 60 * 60;
    }

    /**
     * Returns string representaion of options
     */
    toString(){
        return `path=${this._path};${this.expires!==undefined ? `expires=${this._expires}`:`max-age=${this._maxAge}`}`;
    }
}