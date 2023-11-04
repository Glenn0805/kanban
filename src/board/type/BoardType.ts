import { AddEditCardModalType, Board, CardType } from 'src/shared/type/KanbanType'

export type KanbanData = {
    data: Board[] | [],
    activeCard: CardType | null,
    addEditModal: {
        modal: AddEditCardModalType,
        card: CardType
    }
}

export type ToggleAddEditModal= (actionType:"add" | "edit" | null,listName?:string,card?:CardType)=>void