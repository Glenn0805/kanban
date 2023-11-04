import { Action } from 'Shared/interface/IReducer'
import data from '../data.json'
import { KanbanData } from './type/BoardType'

export const boardInitalState: KanbanData = {
    data: data || [],
    activeCard: null,
    addEditModal: {
        modal: {
            isAddEditModalOpen: false,
            actionType: null,
            listName: ""
        },
        card:{
            cardName : "",
            id : "",
            hasLabel:false,
            labelColor:""
        }
    }
}


const reducer = (state: KanbanData, action: Action) => {
    return {
        ...state,
        ...action?.payload
    }
}

export const boardReducer = (state = boardInitalState, action: Action) => {
    return reducer(state, action)
}