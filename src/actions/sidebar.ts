export const OPEN_SIDBARE="OPEN_SIDBAR";
export const CLOSE_SIDBARE="CLOSE_SIDBARE";
export const TOGGLE_SIDBARE="TOGGLE_SIDBARE";
export const ON_CLICK="ONSIDEBAR_CLICK";


export interface State{
    title?:string,
    isOpen?:boolean,
    items?:Array<Element>
}

export const open = () => {
  return {
    type: OPEN_SIDBARE
  }
}


export const close = () => {
  return {
    type: CLOSE_SIDBARE
  }
}


export const toggle = () => {
  return {
    type: TOGGLE_SIDBARE
  }
}


export const onClick = (clickedItem:string) => {
  return {
    type: ON_CLICK,
    clickedItem
  }
}