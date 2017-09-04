export function genFromArray<T extends {}>(_actions:Array<string>):(state:T,action:{type:string,state:{}})=>T{
    let actions=_actions;
    return function(state:T,action:{type:string,state:{}}):T{
        const {type,...actionState}=action;
        if(actions.includes(action.type))
            return Object.assign({},state,actionState);
        else
            return state;
    }
}


export function genFromObj<T extends {}>(actions:{}):(state:T,action:{type:string,state:{}})=>T{
    let keys=Object.keys(actions).filter((k)=>{
        return typeof actions[k]=="string";
    });
    return genFromArray(keys)
}