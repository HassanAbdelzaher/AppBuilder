import {toast} from '@mas.eg/mas-toastr';

export const showError=(error:string)=>{
    return()=>{
        toast.error(error, {
            position: toast.POSITION.TOP_LEFT
        });
    }
}


export const showMessage=(error:string)=>{
    return()=>{
        toast.info(error, {
            position: toast.POSITION.TOP_LEFT
        });
    }
}


export const showWarn=(error:string)=>{
    return()=>{
        toast.warn(error, {
            position: toast.POSITION.TOP_LEFT
        });
    }
}


export const showSuccess=(error:string)=>{
    return()=>{
        toast.success(error, {
            position: toast.POSITION.TOP_LEFT
        });
    }
}