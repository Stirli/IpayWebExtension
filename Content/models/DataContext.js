class DataContext {
    _currentClass;
    _currentPage;
    _currentMenu;
    _menuList;

    constructor(dateProvider) {
        this._currentClass = new ChromeStorageValue("curc");
        this._currentPage = new ChromeStorageValue("curp");
        this._currentMenu = new ChromeStorageValue("curm");
        this._menuList = new Menu(dateProvider);
    }

    get currentClass() {
        return this._currentClass;
    }

    set currentClass(value) {
        this._currentClass.set(value);
    }

    get currentPage() {
        return this._currentPage;
    }

    set currentPage(value) {
        this._currentPage.set(value);
    }

    get currentMenu() {
        return this._currentMenu;
    }

    set currentMenu(value) {
        this._currentMenu.set(value);
    }

    /**
     * @returns {Menu}
     */
    get menuList() {
        return this._menuList;
    }
}