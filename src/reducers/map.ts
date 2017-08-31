import * as actions from '../actions/map'

const sidebarReducer = (state: actions.State = { center:{lat:31,lng:31},zoom:18,devicesLocations:[{LAT:29,LNG:31}]}, action) : actions.State=> {
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
        default: return state
    }
}

export default sidebarReducer;