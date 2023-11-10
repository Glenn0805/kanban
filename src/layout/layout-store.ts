import { create } from 'zustand';
import useShallowHook from 'Shared/hooks/useShallowHook';
import { persist,createJSONStorage } from 'zustand/middleware';

const initialLayoutState={
    isSideBarOpen:false,
    themeColor:  "light"
}

type InitialState = typeof initialLayoutState

export const layoutStore = create<InitialState>()(
    persist(() => initialLayoutState,{
    name:"themeState",
    storage:createJSONStorage(()=>localStorage),
    partialize:(state)=>({themeColor:state.themeColor})
}))

const useLayoutStore = (): InitialState => useShallowHook(layoutStore)

export default useLayoutStore



