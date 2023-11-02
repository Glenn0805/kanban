import { Action } from 'Shared/interface/IReducer'
import { KanbanData } from 'Shared/type/KanbanType'
import data from '../data.json'

export const boardInitalState: KanbanData = {
    data: data||[],
    activeCard:null
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