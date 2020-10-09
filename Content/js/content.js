import {ChromeStorageValue} from "../../DataProviders/ChromeStorageValue";
import {InfoPanelModule} from "../components/infoPanel/InfoPanelModule";
import {myIpay} from "../../AddonAPI/MyIpay";

let sw_state = new ChromeStorageValue("state");
sw_state.get((v) => {
    if (v) {
        myIpay.observeForChildren(".page-content .col-75", (m, dublicated) => {
            if (!dublicated) {
                console.log("page changed");
                console.log(m);
                console.log(dublicated);
            }
        });
        let containerModule = new InfoPanelModule();
        containerModule.init(() => {
            $("body").append(containerModule._box);
        });
    }
})