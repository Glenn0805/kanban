import { Action } from '../shared/interface/IReducer';
import { ILayoutState } from './interface/LayoutStoreInterface';
export const initialLayoutState:ILayoutState={
    isSideBarOpen:false,
    themeColor: localStorage.getItem("theme") || "light"
}


const reducer = (state:ILayoutState,action:Action)=>{
    return {
       ...state,
       ...action.payload
    }
} 

export const layoutReducer = (state=initialLayoutState,action:Action)=>{
    return reducer(state,action)
}