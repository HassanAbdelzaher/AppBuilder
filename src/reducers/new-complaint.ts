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
        let model={...state.model,...action.model}
        return {            
            ...state,
            model,
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
        case actions.UPDATE_MODEL_LOCATION:
        return {
            ...state,
            state:actions.FORM_STATE.NOT_PROCESSED,
            model:{LAT:action.location.lat,LNG:action.location.lng},
            busy:false,
            error:null
        }
        default: return state
    }
}

export default newComplaintReducer;