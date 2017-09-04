import * as actions from '../actions/floating-panel'

const defaultTimeout=10000;
const panelManger = (state : actions.State = {
    status: false,
    items: [],
    prevsMessages:[],
    timeOut:defaultTimeout,
    title:""
    /*actions:[]*/
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
                items:action.items,
                title:action.title,
                timeOut:action.timeout||defaultTimeout/*,
                actions:action.actions*/
            };
        case actions.ADD_ITEM:
            return {
                ...state,
                status:true,
                items:[...state.items,action.item],
                title:action.title,
                timeOut:action.timeout||defaultTimeout/*,
                actions:action.actions*/
            };
        default:
            return state
    }
}

export default panelManger