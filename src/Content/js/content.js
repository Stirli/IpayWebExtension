import { data } from "jquery";
import { DataContext } from "../../AddonAPI/DataProviders/DataContext";
import { ModuleManager } from "../../AddonAPI/ModuleManager";
import { EatenCalculatorModule } from "../Modules/EatenCalculator/EatenCalculatorModule";

/**
 * @type {DataContext}
 */
const dataContext = new DataContext();
dataContext.load(() => {
	if (dataContext.settings.isEnabled) {
		console.log("Addon is enabled");
		const moduleManager = new ModuleManager(dataContext);
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
		dataContext.settings.isEnabled = false;
	} else {
		console.log("Addon is disabled");
		dataContext.settings.isEnabled = true;
	}
	dataContext.saveContext();
});
