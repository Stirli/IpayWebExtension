class InfoPanelViewModel extends ViewModel{
    #class;
    #breakfast;
    #dinner;
    #secondDinner;
    #currentMode;
    #modeList;
    constructor() {
        super();
        this.#modeList = [];
    }
    getClass(){
        return this.#class;
    }
    setClass(value){
        this.set()
    }
}