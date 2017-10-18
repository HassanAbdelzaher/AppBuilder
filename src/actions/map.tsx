export const CHANGE_MAP_ZOOM = "CHANGE_MAP_ZOOM";
export const CHANGE_MAP_CENTER = "CHANGE_MAP_CENTER";
export const MOVE_TO = "MOVE_TO";
export const SET_DEVICES_LOCATIONS = "SET_DEVICES_LOCATIONS";
export const LOAD_DEVICES_LOCATIONS = "LOAD_DEVICES_LOCATIONS";
export const FAILED_LOAD_DEVICES_LOCATIONS = "FAILED_LOAD_DEVICES_LOCATIONS";
export const SET_MAP_BOUNDS = "SET_MAP_BOUNDS";
export const SET_READINGS_LOCATIONS = "SET_READINGS_LOCATIONS";
export const SHOW_FETURE_INFO ="SHOW_FETURE_INFO";
export const SETLAERSETTINGS="SETLAERSETTINGS"
import * as React from 'react';
import * as fAction from '../actions/floating-panel';
import * as hist from 'history';
import * as lAction from '../actions/loading';
import * as tAction from '../actions/toastr';

import {WebSocketHandler} from '@mas.eg/mas-sockets/src';

export interface State {
  center : {
    lat: number,
    lng: number
  },
  zoom : number,
  devicesLocations? : Array < {
    LAT: number,
    LNG: number
  } >;
  pipeInfo?:string|object,  
  loading?: boolean,
  bounds?: [number, number][],
  readings?:Array < {
    LAT: number,
    LNG: number
  } >
   // layersSettings?:{layerName:{maxZoom:number,minZoom:number,features:number,thread:number}}

  layerSettings?:Array<{layer:string,setting:{maxZoom:number,minZoom:number,features:number,thread:number}}>
}

export const setCenter = (center : {
  lat: number,
  lng: number
}) => {
  return {type: CHANGE_MAP_CENTER, center}
}

export const zoom = (zoom : number) => {
  return {type: CHANGE_MAP_ZOOM, zoom}
}

export const fitBounds = (bounds : [number, number][]) => {
  return {type: SET_MAP_BOUNDS, bounds}
}

export const move = (zoom : number, center : {
  lat: number,
  lng
}) => {
  return {type: MOVE_TO, zoom, center}
}

export const setDevicesLocations = (devicesLocations : Array < {
  LAT: number,
  LNG: number
} >) => {
  return (dispath) => {
    dispath({type: SET_DEVICES_LOCATIONS, devicesLocations});
    let bnds : [number, number][] = devicesLocations.map((d) => {
      let dN : [number, number] = [d.LAT, d.LNG];
      return dN;
    });
    if (bnds.length > 0) 
      dispath(fitBounds(bnds));
    }
  }

export const failedLoadingDevicesLocations = (error : {} | string) => {
  return {type: FAILED_LOAD_DEVICES_LOCATIONS, error}
}
//////////////


export const getDeviceInfo = (DEVICE_ID:string) => {
  const taskId="getDeviceInfo1"+Math.random()*10000;//for handling loading spiner
  return (dispath, getState, {client, api, history}) => {
    if (client) {
      dispath(lAction.addTask(taskId));
      client
        .sendApiRequest("device", "getDeviceInfo",{DEVICE_ID})
        .then((response : any) => {
          dispath(lAction.endTask(taskId));  
          dispath(fAction.setMessage(response.message || response.data));          
          //dispath(fAction.setMessage(response.message || response.data,null,[<button style={{color:'white'}} onClick={()=>{dispath(loadReadings(DEVICE_ID))}}>القراءات</button>]));
        })
        .catch((err) => {
          dispath(lAction.endTask(taskId));                    
          dispath(failedLoadingDevicesLocations(err));
          dispath(tAction.showError(err));
        })
    } else {
      alert("socket connection not defined")
    }
  }
}

export const loadReadings= (DEVICE_ID:string) => {
  console.log("load readings "+DEVICE_ID);
  const taskId="loadReadings"+DEVICE_ID+Math.random()*10000;//for handling loading spiner  
  return (dispath, getState, {client, api, history}) => {
    console.log("load readings 2 "+DEVICE_ID);    
    if (client) {
      dispath(lAction.addTask(taskId));      
      client
        .sendApiRequest("device", "getDeviceReadings",{DEVICE_ID})
        .then((response : any) => {
          console.log("found readings "+(response.data||response||{}).length);
          dispath(lAction.endTask(taskId));                    
          dispath(setReadings(DEVICE_ID,response.data||response));
        })
        .catch((err) => {
          dispath(lAction.endTask(taskId));                    
          dispath(failedLoadingDevicesLocations(err));
          dispath(tAction.showError(err));
          
        })
    } else {
      alert("socket connection not defined")
    }
  }
}

export const setReadings=(DEVICE_ID:string,readings:[any])=>
{
  return (dispath)=>{
    dispath({type: SET_READINGS_LOCATIONS, readings});
    let bnds : [number, number][] = readings.map((d) => {
      let dN : [number, number] = [d.LAT, d.LNG];
      return dN;
    });
    if (bnds.length > 0) 
      dispath(fitBounds(bnds));
    }  
}

//asyncrouns actions

export const loadDevicesLocations = () => {
  const taskId="loadDevicesLocations"+Math.random()*10000;//for handling loading spiner    
  return (dispath, getState, {client, api, history}) => {
    let state = getState();
    let h : hist.History = history;
    console.dir(h.location);
    if (h.location.pathname != "/") 
      h.push("/")
    if (client) {
      dispath(lAction.addTask(taskId));      
      client
        .sendApiRequest("map", "getDevicesLocations")
        .then((response : any) => {
          dispath(lAction.endTask(taskId));                    
          if (response.data) 
            dispath(setDevicesLocations(response.data));
          if (response.message) 
            dispath(fAction.setMessage(response.message));
          if (response.error) 
            dispath(fAction.setMessage(response.error));
          }          
          
        )
        .catch((err) => {
          dispath(lAction.endTask(taskId));                    
          dispath(failedLoadingDevicesLocations(err));
          dispath(fAction.setMessage(err?err.toString():""));
          dispath(tAction.showError(err));          
        })
    } else {
      alert("socket connection not defined")
    }
  }
}
export const savingLayerSettings = (settings:any) =>{
  console.log(settings);
  
//   let obj={
//     "pipes":{maxZoom:settings.maxZoomP,minZoom:settings.minZoomP,features:settings.featuresP,thread:settings.threadP},
//     "stations":{maxZoom:settings.maxZoomP,minZoom:settings.minZoomP,features:settings.featuresP,thread:settings.threadP},
//     "v":{maxZoom:settings.maxZoomV,minZoom:settings.minZoomV,features:settings.featuresV,thread:settings.threadV},
//     "bounds":{maxZoom:settings.maxZoomBo,minZoom:settings.minZoomBo,features:settings.featuresBo,thread:settings.threadBo}
// }
  let obj=[
         {
          layer:"pipe",
          setting:{maxZoom:settings.maxZoomP,minZoom:settings.minZoomP,features:settings.featuresP,thread:settings.threadP}
          },
          {
            layer:"bounds",setting:{maxZoom:settings.maxZoomBo,minZoom:settings.minZoomBo,features:settings.featuresBo,thread:settings.threadBo}
          },
          {layer:"v",setting:{maxZoom:settings.maxZoomV,minZoom:settings.minZoomV,features:settings.featuresV,thread:settings.threadV}},
          {     
           layer:"stations",setting:{maxZoom:settings.maxZoomS,minZoom:settings.minZoomS,features:settings.featuresS,thread:settings.threadS}
          }
  ]
   return {
      type: 'SETLAERSETTINGS',
      layerSettings:obj 
}
}