import * as actions from '../actions/settings'

const settingsReducer = (state: actions.State = { server: 'localhost', port: 1214, namespace: "client",
layerSettings:[]}, action): actions.State => {
    switch (action.type) {
        case actions.LOAD_SETTINGS_SUCCSSED:
            return {
                ...state,
                ...action.settings
            };
        case actions.SAVE_SETTINGS:
            return {
                ...state,
                ...action.settings
            };
        case actions.SETTINGS_SAVED:
        return {            
            ...state,
            ...action.settings
        };
        case actions.SWITCH_MODE:
        if(!action.mode)
            return state;
        else
            return {            
                ...state,
                mode:action.mode
            };
        default: return state
    }
}

export default settingsReducer;