import * as actions from '../actions/map'

const sidebarReducer = (state: actions.State = { center:{lat:29.264555707767823,lng:30.858626961708072},zoom:16,devicesLocations:[],layerSettings:[{layer:null,setting:{maxZoom:12,minZoom:15,features:25,thread:15}}]/*,bounds:null,readings:[],pipeInfo:""*/}, action) : actions.State=> {
    switch (action.type) {
        case actions.CHANGE_MAP_CENTER:
            return {
                ...state,
                center:action.center
            };
            case actions.CHANGE_MAP_ZOOM:
            return {
                ...state,
                zoom:action.zoom
            };
            case actions.MOVE_TO:
            return {
                ...state,
                center:action.center,
                zoom:action.zoom
            };
            /*case actions.SET_MAP_BOUNDS:
            return {
                ...state,
                bounds:action.bounds
            };*/
            case actions.LOAD_DEVICES_LOCATIONS:
            return {
                ...state,
                loading:true
            };
            case actions.SET_DEVICES_LOCATIONS:
            return {
                ...state,
                devicesLocations:action.devicesLocations,
                loading:false
            };
            case actions.FAILED_LOAD_DEVICES_LOCATIONS:
            return {
                ...state,
                loading:false
            };
             case actions.SETLAERSETTINGS:             
            return {
                ...state,
                layerSettings:action.layerSettings
                
            };
            /*case actions.SET_READINGS_LOCATIONS:
            return {
                ...state,
                readings:action.readings
            }*/
           
        default: return state
    }
}

export default sidebarReducer;