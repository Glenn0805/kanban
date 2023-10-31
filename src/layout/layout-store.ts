import { ILayoutState } from './interface/LayoutStoreInterface';
import { create } from 'zustand';
import { layoutReducer, initialLayoutState } from './layout-reducer';
import { Action, DipatchAction } from '../shared/interface/IReducer';
import useShallowHook from '../shared/hooks/useShallowHook';

const layoutStore = create<ILayoutState & DipatchAction>((set) => ({
    ...initialLayoutState,
    dispatch: (action: Action) => set((state: ILayoutState) => layoutReducer(state, action))
}))

const useLayoutStore = (): ILayoutState & DipatchAction => useShallowHook(layoutStore)

export default useLayoutStore

