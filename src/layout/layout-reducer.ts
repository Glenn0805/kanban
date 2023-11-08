import { Action } from 'Shared/interface/IReducer';
import { ILayoutState } from './interface/LayoutStoreInterface';
export const initialLayoutState:ILayoutState={
    isSideBarOpen:false,
    themeColor:  "light"
}


const reducer = (state:ILayoutState,action:Action)=>{
    return {
       ...state,
       ...action?.payload
    }
} 

export const layoutReducer = (state=initialLayoutState,action:Action)=>{
    return reducer(state,action)
}