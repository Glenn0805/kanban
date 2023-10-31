import {ILayoutState } from './interface/LayoutStoreInterface';
import {Action} from '../shared/interface/IReducer';
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