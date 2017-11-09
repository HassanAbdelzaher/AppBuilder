export const LOADING_FORM = "LOADING_FORM";
export const SAVING_FORM = "SAVING_FORM";
export const COMPLAINT_FORM = "COMPLAINT_FORM";
export const SAVE_FORM_FAILD = "SAVE_FORM_FAILD";
export const SAVE_FORM_SUCCSSED = "SAVE_FORM_SUCCSSED";

import {WebSocketHandler} from '@mas.eg/mas-sockets/src';

export interface State {
    formName:string,
    model:{}
}

export const save = (controller:string,action:string,model:{},args?:{}) => {
    return function (dispatch, getState, {client}:{client:WebSocketHandler}) {
        dispatch({type:SAVING_FORM})                    
        client.sendApiRequest(controller,action,model)
        .then((model)=>{
            dispatch({type:SAVE_FORM_SUCCSSED,model})            
        })
        .catch((error)=>{
            dispatch({type:SAVE_FORM_FAILD,error})
        });
    }
}