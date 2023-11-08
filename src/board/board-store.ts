import { create } from 'zustand';
import useShallowHook from 'Shared/hooks/useShallowHook';
import { boardInitalState,boardReducer } from './board-reducer';
import { DipatchAction } from 'Shared/interface/IReducer';
import { KanbanData } from './type/BoardType';

const  boardStore = create<KanbanData & DipatchAction>((set)=>({
    ...boardInitalState,
    dispatch:(action)=> set((state: KanbanData) => boardReducer(state, action))
}))

const useBoardStore =():KanbanData & DipatchAction => useShallowHook(boardStore)

export default useBoardStore