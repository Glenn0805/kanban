import { AddEditCardModalType, Board, CardType } from 'src/shared/type/KanbanType'

export type KanbanData = {
    data: Board[] | [],
    activeCard: CardType | null,
    addEditModal: {
        modal: AddEditCardModalType,
        card: CardType
    }
}

export type ToggleAddEditModal= (params:{actionType:"add" | "edit" | null,listName?:string,listId?:string,card?:CardType})=>void