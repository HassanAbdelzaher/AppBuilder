export const ADD_TASK="ADD_TASK";
export const END_TASK="END_TASK";


export interface State{
    showLoading:boolean,
    loadingObj:{}
}

export const addTask = (taskId:string) => {
  return {
    type: ADD_TASK,
    taskId
  }
}


export const endTask = (taskId:string) => {
    return {
      type: END_TASK,
      taskId
    }
  }