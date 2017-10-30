import * as actions from '../actions/lu';

const headerTitleReducer = (state: actions.State = {ComplaintTypes:[],ActionType:[] }, action) => {
    switch (action.type) {
        case actions.LOADING_LOOKUPS_SUCSSED:
            return {
                ...state,
                ...action.lookups
        };
        default: return state
    }
}

export default headerTitleReducer;