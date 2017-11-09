import * as actions from '../actions/lu';

const initLookupsStr=localStorage.getItem(actions.MAS_OM_LOCALSTORAGE_KEY) ; 
var initLookups={ComplaintTypes:[],ActionTypes:[]};
if(initLookupsStr){
    initLookups=JSON.parse(initLookupsStr);
}
const headerTitleReducer = (state: actions.State =initLookups , action) => {
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