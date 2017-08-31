export const SET_TITLE="SET_HEADER_TITLE";

export interface State{
    title:string
}

export const setTile = (title:string):{type:string,title:string} => {
  return {
    type: SET_TITLE,
    title
  }
}
