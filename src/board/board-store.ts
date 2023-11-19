import { create } from 'zustand';
import useShallowHook from 'Shared/hooks/useShallowHook';
import { KanbanData } from './type/BoardType';
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import data from '../data.json'


const boardInitalState: KanbanData = {
    data: data || [],
    activeCard: null,
    addEditModal: {
        modal: {
            isAddEditModalOpen: false,
            actionType: null,
            listName: "",
            listId:""
        },
        card: {
            cardName: "",
            id: "",
            cardLevel: 'medium'
        }
    },
    addEditListModal:{
        modal:{
            isAddEditModalOpen:false,
            actionType:null,
            boardName:"",
            boardId:""
        },
        list:{
            cards:[],
            id:"",
            listName:"",
        }
    },
    activeList:null,
    addEditBoardModal:{
        modal:{
            isAddEditModalOpen:false,
            actionType:null,
        },
        board:{
            boardId:"",
            boardName:"",
            lists:[]
        }
    },
    activeBoard: {
        boardId:"",
        boardName:"",
        lists:[]
    }
}


export const boardStore = create<KanbanData>()(
    persist(
        devtools(() => boardInitalState,
            {
                name: "boardState",
                store: "boardStore"
            }
        ), {
        name: "boardState",
        storage: createJSONStorage(() => localStorage),
        partialize: state => ({ data: state.data })
    }
    )
)

const useBoardStore = (): KanbanData => useShallowHook(boardStore)

export default useBoardStore