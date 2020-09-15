class Keyboard {

    Backquote;
    Backslash;
    Backspace;
    BracketLeft;
    BracketRight;
    Comma;
    Digit;
    Equal;
    IntlBackslash;
    IntlRo;
    IntlYen;
    KeyA;
    KeyB;
    KeyC;
    KeyD;
    KeyE;
    KeyF;
    KeyG;
    KeyH;
    KeyI;
    KeyJ;
    KeyK;
    KeyL;
    KeyM;
    KeyN;
    KeyO;
    KeyP;
    KeyQ;
    KeyR;
    KeyS;
    KeyT;
    KeyU;
    KeyV;
    KeyW;
    KeyX;
    KeyY;
    KeyZ;
    Minus;
    Period;
    Quote;
    Semicolon;
    Slash;
    AltLeft;
    AltRight;
    CapsLock;
    ContextMenu;
    ControlLeft;
    ControlRight;
    Enter;
    MetaLeft;
    MetaRight;
    ShiftLeft;
    ShiftRight;
    Space;
    Tab;
    Convert;
    KanaMode;
    Lang;
    NonConvert;
    Delete;
    End;
    Help;
    Home;
    Insert;
    PageDown;
    PageUp;
    ArrowDown;
    ArrowLeft;
    ArrowRight;
    ArrowUp;
    NumLock;
    Numpad;
    NumpadAdd;
    NumpadBackspace;
    NumpadClear;
    NumpadClearEntry;
    NumpadComma;
    NumpadDecimal;
    NumpadDivide;
    NumpadEnter;
    NumpadEqual;
    NumpadHash;
    NumpadMemoryAdd;
    NumpadMemoryClear;
    NumpadMemoryRecall;
    NumpadMemoryStore;
    NumpadMemorySubtract;
    NumpadMultiply;
    NumpadParenLeft;
    NumpadParenRight;
    NumpadStar;
    NumpadSubtract;
    Escape;
    Fn;
    FnLock;
    PrintScreen;
    ScrollLock;
    Pause;
    BrowserBack;
    BrowserFavorites;
    BrowserForward;
    BrowserHome;
    BrowserRefresh;
    BrowserSearch;
    BrowserStop;
    Eject;
    LaunchApp;
    LaunchMail;
    MediaPlayPause;
    MediaSelect;
    MediaStop;
    MediaTrackNext;
    MediaTrackPrevious;
    Power;
    Sleep;
    AudioVolumeDown;
    AudioVolumeMute;
    AudioVolumeUp;
    WakeUp;
    Hyper;
    Super;
    Turbo;
    Abort;
    Resume;
    Suspend;
    Again;
    Copy;
    Cut;
    Find;
    Open;
    Paste;
    Props;
    Select;
    Undo;

    constructor(element) {
        for (let k in this) {
            this[k] = false;
        }
        
        let setModsKeyStates = function (e, state) {
            this[e.code] = state;
        }.bind(this);

        if (element === undefined) {
            element = document;
        }

        if (element.jquery) {
            element.each(function () {
                this.addEventListener("keyup", function (e) {
                    setModsKeyStates(e, false)
                }, true);
                this.addEventListener("keydown", function (e) {
                    setModsKeyStates(e, true)
                }, true);
            });
        } else {
            element.addEventListener("keyup", function (e) {
                setModsKeyStates(e, false)
            }, true);
            element.addEventListener("keydown", function (e) {
                setModsKeyStates(e, true)
            }, true);
        }
    }

}   
