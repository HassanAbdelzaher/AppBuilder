import * as actions from '../actions/floating-panel'

const panelManger = (state : actions.State = {
    status: false,
    items: [],
    prevsMessages:[],
    timeOut:5000,
    title:""
}, action ):actions.State => {
    switch (action.type) {
        case actions.OPEN:
            return {
                ...state,
                status: true
            };
        case actions.CLOSE:
            return {...state,...{status: false, items: []}};
        case actions.TOGGLE:
            return {
                ...state,
                status: !state.status
            };
        case actions.SET_ITEMS:
            return {
                ...state,
                status:true,
                items:action.items
            };
        case actions.ADD_ITEM:
            return {
                ...state,
                status:true,
                items:[...state.items,action.item],
            };
        default:
            return state
    }
}

export default panelManger