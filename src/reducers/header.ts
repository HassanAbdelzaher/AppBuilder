import * as actions from '../actions/HEADER'

const headerTitleReducer = (state: actions.State = { title: "MasTv" }, action) => {
    switch (action.type) {
        case actions.SET_TITLE:
            return {
                ...state,
                title: action.title
            };
        default: return state
    }
}

export default headerTitleReducer;