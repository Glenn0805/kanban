import { create } from 'zustand';
import useShallowHook from 'Shared/hooks/useShallowHook';
import { KanbanData } from './type/BoardType';
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import data from '../data.json'

const boardInitalState:KanbanData = {
    data: data || [],
    activeCard: null,
    addEditModal: {
        modal: {
            isAddEditModalOpen: false,
            actionType: null,
            listName: ""
        },
        card: {
            cardName: "",
            id: "",
            cardLevel: 'medium'
        }
    }
}


export const boardStore = create<KanbanData>()(
    devtools(persist(
        () => boardInitalState,
        {
            name: "boardState",
            storage: createJSONStorage(() => localStorage),
            partialize: state =>( {data:state.data})
        }
    ))
)

const useBoardStore = (): KanbanData => useShallowHook(boardStore)

export default useBoardStore