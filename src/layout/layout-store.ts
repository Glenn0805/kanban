import { ILayoutState } from './interface/LayoutStoreInterface';
import { create } from 'zustand';
import { layoutReducer, initialLayoutState } from './layout-reducer';
import { Action, DipatchAction } from 'Shared/interface/IReducer';
import useShallowHook from 'Shared/hooks/useShallowHook';
import { persist,createJSONStorage } from 'zustand/middleware';

const layoutStore = create<ILayoutState & DipatchAction>()(
    persist((set) => ({
    ...initialLayoutState,
    dispatch: (action: Action) => set((state: ILayoutState) => layoutReducer(state, action))
}),{
    name:"themeState",
    storage:createJSONStorage(()=>localStorage)
}))

const useLayoutStore = (): ILayoutState & DipatchAction => useShallowHook(layoutStore)

export default useLayoutStore

