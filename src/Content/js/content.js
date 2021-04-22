import { ChromeStorageValue } from "../../DataProviders/ChromeStorageValue";
import { moduleManager } from "../../AddonAPI/ModuleManager";
import { EatenCalculatorModule } from "../Modules/EatenCalculator/EatenCalculatorModule";

let storage = new ChromeStorage();
let sw_state = new ChromeStorageValue("state");
sw_state.get((v) => {
	if (v) {
		moduleManager.registerModule(EatenCalculatorModule);
		moduleManager.start();
		/*myIpay.observeForChildren(".page-content .col-75", (m, dublicated) => {
            if (!dublicated) {
                console.log("page changed");
                console.log(m);
                console.log(dublicated);
            }
        });
        let containerModule = new InfoPanelModule();
        containerModule.init(() => {
            $("body").append(containerModule._box);
        });*/
	}
});
