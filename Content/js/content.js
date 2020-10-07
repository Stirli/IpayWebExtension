import {ChromeStorageValue} from "../../DataProviders/ChromeStorageValue";
import {InfoPanelModule} from "../components/infoPanel/InfoPanelModule";

let sw_state = new ChromeStorageValue("state");
sw_state.get((v) => {
    if (v) {
        let containerModule = new InfoPanelModule();
        containerModule.init(()=>{
            $("body").append(containerModule._box);
        });
    }
})