import { create } from 'zustand';
import useShallowHook from 'Shared/hooks/useShallowHook';
import { boardInitalState, boardReducer } from './board-reducer';
import { DipatchAction } from 'Shared/interface/IReducer';
import { KanbanData } from './type/BoardType';
import { persist, createJSONStorage } from 'zustand/middleware'

const boardStore = create<KanbanData & DipatchAction>()(
    persist(
        (set) => ({
            ...boardInitalState,
            dispatch: (action) => set((state: KanbanData) => boardReducer(state, action))
        }),
        {
            name: "boardState",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

const useBoardStore = (): KanbanData & DipatchAction => useShallowHook(boardStore)

export default useBoardStore