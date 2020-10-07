import {ChromeStorageValue} from "../../DataProviders/ChromeStorageValue";
let sw_state = new ChromeStorageValue("state");
sw_state.get((v)=>{
    $("#switcher").prop('checked',v);
    $("#switcher").click((e)=>{
        sw_state.set( $("#switcher").prop('checked'));
        console.log($("#switcher").prop('checked'));
    });
});