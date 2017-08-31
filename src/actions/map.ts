export const CHANGE_MAP_ZOOM="CHANGE_MAP_ZOOM";
export const CHANGE_MAP_CENTER="CHANGE_MAP_CENTER";
export const MOVE_TO="MOVE_TO";
export const SET_DEVICES_LOCATIONS="SET_DEVICES_LOCATIONS";
export const LOAD_DEVICES_LOCATIONS="LOAD_DEVICES_LOCATIONS";
export const FAILED_LOAD_DEVICES_LOCATIONS="FAILED_LOAD_DEVICES_LOCATIONS";

import * as fAction from '../actions/floating-panel'

import {WebSocketHandler} from '@mas.eg/mas-sockets/dist';

export interface State {
    center:{lat:number,lng:number},
    zoom:number,
    devicesLocations:Array<{LAT:number,LNG:number}>
    loading?:boolean
}

export const setCenter = (center:{lat:number,lng:number}) => {
  return {
    type: CHANGE_MAP_CENTER,
    center
  }
}



export const zoom = (zoom:number) => {
  return {
    type: CHANGE_MAP_ZOOM,
    zoom
  }
}


export const move = (zoom:number,center:{lat:number,lng}) => {
  return {
    type: MOVE_TO,
    zoom,
    center
  }
}



export const setDevicesLocations = (devicesLocations:Array<{LAT:number,LNG:number}>) => {
  return {
    type: SET_DEVICES_LOCATIONS,
    devicesLocations
  }
}

export const failedLoadingDevicesLocations = (error:{}|string) => {
  return {
    type: FAILED_LOAD_DEVICES_LOCATIONS,
    error
  }
}

//asyncrouns actions

export const loadDevicesLocations = () => {
  return (dispath,getState,{client,api})=>{
    let state=getState();
    if(client){
      client.sendApiRequest("map","getDevicesLocations").then((response:any)=>{
      if(response.data)
        dispath(setDevicesLocations(response.data));
      if(response.message)
        dispath(fAction.setMessage(response.message));
      }).catch((err)=>{
         dispath(failedLoadingDevicesLocations(err))
      })
    }
  }
}
