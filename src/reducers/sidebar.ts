import * as actions from '../actions/sidebar'

const sidebarReducer = (state: actions.State = { title: "MasOm",isOpen:true,items:[] }, action) => {
    switch (action.type) {
        case actions.OPEN_SIDBARE:
            return {
                ...state,
                isOpen: true
            };
            case actions.CLOSE_SIDBARE:
            return {
                ...state,
                isOpen: false
            };
            case actions.TOGGLE_SIDBARE:
            console.log('TOGGLE_SIDBARE:'+state.isOpen)
            return {
                ...state,
                isOpen: !state.isOpen
            };
        default: return state
    }
}

export default sidebarReducer;