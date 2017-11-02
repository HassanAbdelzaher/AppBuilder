export const LOADING_LOOKUPS = "LOADING_LOOKUPS";
export const LOADING_LOOKUPS_SUCSSED = "LOADING_LOOKUPS_SUCSSED";
export const LOADING_LOOKUPS_FAILED = "LOADING_LOOKUPS_FAILED";
export const MAS_OM_LOCALSTORAGE_KEY="MAS_OM_LOCALSTORAGE_KEY";

import * as lAction from '../actions/loading';
import * as models from '@mas.eg/mas-data-models/server';

import {WebSocketHandler} from '@mas.eg/mas-sockets/src';

export interface State extends models.Lookup {
}

export const loadLookup = () => {
    return function (dispatch, getState, {client}:{client:WebSocketHandler}) {
        dispatch({type:LOADING_LOOKUPS});
        dispatch(lAction.addTask("loadingLookups"));                   
        client.sendApiRequest("lookup","getAll")
        .then((lookups:{data:models.Lookup})=>{
            //expect object with all lookups
            dispatch({type:LOADING_LOOKUPS_SUCSSED,lookups:(lookups.data||lookups)});
            dispatch(lAction.endTask("loadingLookups"));
            if((lookups && lookups.data))
                localStorage.setItem(MAS_OM_LOCALSTORAGE_KEY,JSON.stringify((lookups.data||lookups))) ;                              
        })
        .catch((error)=>{
            console.log(error);
            dispatch({type:LOADING_LOOKUPS_FAILED,error});
            dispatch(lAction.endTask("loadingLookups"));   
        });
    }
}