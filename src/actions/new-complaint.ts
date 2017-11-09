export const SAVE_COMPLAINT = "SAVE_COMPLAINT";
export const SAVING_COMPLAINT = "SAVING_COMPLAINT";
export const COMPLAINT_SAVED = "COMPLAINT_SAVED";
export const SAVE_COMPLAINT_FAILD = "SAVE_COMPLAINT_FAILD";
export const SAVE_COMPLAINT_SUCCSSED = "SAVE_COMPLAINT_SUCCSSED";
export const UPDATE_MODEL_LOCATION = "UPDATE_MODEL_LOCATION";

import * as _ from 'lodash';
import * as lActions from './loading';
import * as tActions from './toastr';

import {WebSocketHandler} from '@mas.eg/mas-sockets/src';

export enum FORM_STATE{
    NOT_PROCESSED=0,
    UPDATED=1,
    VALIDATED=2,    
    SAVED=3,
    FAILED=4,
}
export interface Model{
    NAME?:string,
    LAT?:Number,
    LNG?:number
    ADDRESS?:string,
    STAMP_DATE?:Date,
    STAMP_USER?:string,
    TYPE?:string,
    DESCRIPTION?:string,
    ACTION?:string
}
export interface State {
    model:Model,
    error?:string,
    state:FORM_STATE,
    busy?:boolean
}
export const updateInitModelLocation=(location:{lat:number,lng:number})=>{
    return {
        type: UPDATE_MODEL_LOCATION,
        location
      }
}
export const saveComplaint = (complaint) => {
    return function (dispatch, getState, {client}:{client:WebSocketHandler}) {
        dispatch({type:SAVING_COMPLAINT,model:complaint}); 
        let taskId="SaveCompl"+Math.random();
        dispatch(lActions.addTask(taskId));                 
        client.sendApiRequest("complaints","add",complaint)
        .then((response:any)=>{
            console.dir({response})
            dispatch({type:SAVE_COMPLAINT_SUCCSSED,model:response.data});
            dispatch(lActions.endTask(taskId));       
        })
        .catch((error)=>{
            let strError="Error";
            if(_.isString(error))
                strError=error;
            if(_.isObject(error))
                strError=error.Error||error.error||error.message||error.err;
            dispatch({type:SAVE_COMPLAINT_FAILD,error:strError});
            dispatch(lActions.endTask(taskId));   
        });
    }
}