
//IMPORTANT NOTE ACTION NAMES MUST BE UNIQUE IN THE APPLICATION 
export const OPEN="OPEN_FLOATINGPANEL",
  CLOSE="CLOSE_FLOATINGPANEL",
  TOGGLE="TOGGLE_FLOATINGPANEL",
  SET_ITEMS="SETITEMS_FLOATINGPANEL",
  ADD_ITEM="ADDITEM_FLOATINGPANEL";


export interface Item{
  name:string,
  value?:any;
}

export interface State{
  status:boolean,
  items:Array<Item>,
  timeOut:number,
  prevsMessages:Array<Array<Item>>,
  title:string,
  

}

export const openPanel = ():{type:string} => {
  return {
    type: OPEN
  }
}


export const closePanel = ():{type:string} => {
  return {
    type: CLOSE
  }
}


export const togglePanel = ():{type:string} => {
  return {
    type: TOGGLE
  }
}

export const setItems = (items:Array<Item>):{type:string,items:Array<Item>} => {
  console.log("fire set items action")
  return {
    type: SET_ITEMS,
    items
  }
}


export const setMessage = (message:object|string) => {  
  let items=[];
        if(typeof message=="object"){
            items=Object.keys(message).map((k)=>{
                return {name:k,value:message[k]}
            });  
          
        }
        else{
            items=[{name:"",value:message.toString()}];
        }

  return {
    type: SET_ITEMS,
    items
  }
}



export const addItem = (item:Item):{type:string,item:Item} => {
  return {
    type: ADD_ITEM,
    item
  }
}