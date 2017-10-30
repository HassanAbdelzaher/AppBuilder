import * as actions from '../actions/new-complaint'

const newComplaintReducer = (state: actions.State = {model:{STAMP_DATE:new Date()},state:actions.FORM_STATE.NOT_PROCESSED}, action): actions.State => {
    switch (action.type) {        
        case actions.SAVING_COMPLAINT:
            return {
                ...state,
                model:action.model||state.model,                
                busy:true,
                error:null
            };
        case actions.SAVE_COMPLAINT_SUCCSSED:
        return {            
            ...state,
            model:action.model||state.model,
            state:actions.FORM_STATE.SAVED,
            busy:false,
            error:null      
        };
        case actions.SAVE_COMPLAINT_FAILD:
        return {            
            ...state,
            state:actions.FORM_STATE.FAILED,
            model:action.model||state.model,
            busy:false,
            error:action.error
        };
        default: return state
    }
}

export default newComplaintReducer;