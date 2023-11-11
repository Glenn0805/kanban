import { create } from 'zustand';
import useShallowHook from 'Shared/hooks/useShallowHook';
import { persist,createJSONStorage } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

const initialLayoutState={
    isSideBarOpen:false,
    themeColor:  "light"
}

type InitialState = typeof initialLayoutState

export const layoutStore = createWithEqualityFn<InitialState>()(
    persist(() => initialLayoutState,{
    name:"themeState",
    storage:createJSONStorage(()=>localStorage),
    partialize:(state)=>({themeColor:state.themeColor})
}))

const useLayoutStore = layoutStore

export default useLayoutStore



