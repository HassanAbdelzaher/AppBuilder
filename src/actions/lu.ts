export const LOADING_LOOKUPS = "LOADING_LOOKUPS";
export const LOADING_LOOKUPS_SUCSSED = "LOADING_LOOKUPS_SUCSSED";
export const LOADING_LOOKUPS_FAILED = "LOADING_LOOKUPS_FAILED";

import * as models from '@mas.eg/mas-data-models/server'

import {WebSocketHandler} from '@mas.eg/mas-sockets/src';

export interface State extends models.Lookup {
}

export const loadLookup = () => {
    return function (dispatch, getState, {client}:{client:WebSocketHandler}) {
        dispatch({type:LOADING_LOOKUPS})                    
        client.sendApiRequest("lookup","getAll")
        .then((lookups:models.Lookup)=>{
            //expect object with all lookups
            dispatch({type:LOADING_LOOKUPS_SUCSSED,lookups})            
        })
        .catch((error)=>{
            dispatch({type:LOADING_LOOKUPS_FAILED,error})
        });
    }
}