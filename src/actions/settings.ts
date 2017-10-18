export const LOAD_SETTINGS = "LOAD_SETTINGS";
export const SAVE_SETTINGS = "SAVE_SETTINGS";
export const SETTINGS_LOADED = "SETTINGS_LOADED";
export const SETTINGS_SAVED = "SETTINGS_SAVED";
export const LOAD_SETTINGS_FAILD = "LOAD_SETTINGS_FAILD";
export const LOAD_SETTINGS_SUCCSSED = "LOAD_SETTINGS_SUCCSSED";

import {WebSocketHandler} from '@mas.eg/mas-sockets/src';

export interface State {
    server : string,
    port : number,
    namespace: string,
    layerSettings:Array<{layer:string,settings:{maxZoom:number,minZoom:number,features:number,thread:number}}>
}
export const loadLocalSettings = () => {
    return {
        type: LOAD_SETTINGS_SUCCSSED,
        settings:JSON.parse(localStorage.getItem("settings")) || {}
    }
}
export const loadServerSettings = () => {
    return function (dispatch, getState, {client}) {
        dispatch({type: LOAD_SETTINGS})
        let cl : WebSocketHandler = client;
        cl
            .sendApiRequest("settings", "load")
            .then((response : {
                data,
                error
            }) => {
                if (!response.error) 
                    dispatch({type: LOAD_SETTINGS_SUCCSSED, settings: response.data});
                else 
                    dispatch({type: LOAD_SETTINGS_FAILD, error: response.error})

            })
            .catch((err) => {
                console.dir({err});
                dispatch({type: LOAD_SETTINGS_FAILD, error: err})
            })
    }
}
export const saveSettings = (settings : {}=null) => {
    if (settings) {
        localStorage.setItem("settings",JSON.stringify(settings));
        return {type: SETTINGS_SAVED, settings}
    }
}
