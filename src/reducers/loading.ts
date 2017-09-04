import * as actions from '../actions/loading'

const loadingReducer = (state : actions.State = {
    showLoading: false,
    loadingObj: {}
}, action) => {
    switch (action.type) {
        case actions.ADD_TASK:
            let loadingObj = {
                ...state.loadingObj,
                [action.taskId]: true
            }
            return {
                ...state,
                showLoading: true,
                loadingObj
            };
        case actions.END_TASK:
            delete state.loadingObj[action.taskId];
            let showLoading=Object.keys(state.loadingObj).filter((k)=>{return state.loadingObj[k]}).length>0;
            return {
                ...state,
                showLoading,
                loadingObj
            };
        default:
            return state
    }
}

export default loadingReducer;