import * as actions from '../actions/HEADER'

import pkg from '../utils/package';

console.dir({pkg})

const headerTitleReducer = (state: actions.State = { title:pkg.title || '...',version:pkg.version }, action) => {
    switch (action.type) {
        case actions.SET_TITLE:
            return {
                ...state,
                title: action.title,
                version:action.version
            };
        default: return state
    }
}

export default headerTitleReducer;