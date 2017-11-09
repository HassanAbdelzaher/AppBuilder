import * as hist from 'history';

export function routTo(loc:string){
    return function(dispatch, getState, {history}){
        history.push(loc)
    }
}