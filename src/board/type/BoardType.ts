import { AddEditCardModalType, AddEditListModalType, Board, CardType, List } from 'src/shared/type/KanbanType'

export type KanbanData = {
    data: Board[] | [],
    activeCard: CardType | null,
    addEditModal: {
        modal: AddEditCardModalType,
        card: CardType
    },
    addEditListModal: {
        modal: AddEditListModalType,
        list: List
    }
}

export type ToggleAddEditModal = (params: { actionType: "add" | "edit" | null, listName?: string, listId?: string, card?: CardType }) => void

export type ToggleAddEditListModal = (params: { actionType: "add" | "edit" | null, boardName?: string, boardId?: string, list?: List }) => void