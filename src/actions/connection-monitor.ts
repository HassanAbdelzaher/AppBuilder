import * as sActions from './settings'

import {CONNECTION_STATUS} from '../components/ConnectionMonitor'
import {WebSocketHandler} from '@mas.eg/mas-sockets/src'

//IMPORTANT NOTE ACTION NAMES MUST BE UNIQUE IN THE APPLICATION 

export const CONNECT="CONNECT";
export const DISCONNECT="DISCONNECT";
export const SEND="SEND";
export const RECONNECTING="RECONNECTING";
export const RECEVIED="RECEVIED";
export const FAILED="FAILED";
export const CONNECTION_ERROR="CONNECTION_ERROR";
export const MESSAGE_RECEVIED="MESSAGE_RECEVIED";
export const CONNECTION_CREATED="CONNECTION_CREATED";


export interface State {
  status:CONNECTION_STATUS,
  clinet:WebSocketHandler
}

export const create = (client:WebSocketHandler) => {
  return {
    type: CONNECTION_CREATED,
    client
  }
}

export const connect = () => {
  return {
    type: CONNECT
  }
}


export const changeConnectionSettings = (config:{server:string,port:number,namespace:string}) => {
  return function(dispatch,getState,{client}){
    let cl:WebSocketHandler=client;
    let url=(config.server)+":"+(config.port)+"/"+(config.namespace);
    if(cl){
      //cl.reConfig(url);
    }
    //changing the server settings     
    dispatch(sActions.saveSettings(config))
  }
}

export const disConnect = () => {
  return {
    type: DISCONNECT
  }
}



export const reConnecting = () => {
  return {
    type: RECONNECTING
  }
}