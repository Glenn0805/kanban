import { AddEditCardModalType, AddEditListModalType, Board, CardType, List,AddEditBoardModalType } from 'src/shared/type/KanbanType'

export type KanbanData = {
    data: Board[] | [],
    activeCard: CardType | null,
    activeList:List | null,
    activeBoard:Board,
    addEditModal: {
        modal: AddEditCardModalType,
        card: CardType
    },
    addEditListModal: {
        modal: AddEditListModalType,
        list: List
    },
    addEditBoardModal: {
        modal: AddEditBoardModalType,
        board: Board | NonNullable<unknown>
    }
}

export type ToggleAddEditModal = (params: { actionType: "add" | "edit" | null, listName?: string, id?: string, card?: CardType }) => void

export type ToggleAddEditListModal = (params: { actionType: "add" | "edit" | null, boardName?: string, boardId?: string, list?: List }) => void

export type ToggleAddEditBoardModal = (params: { actionType: "add" | "edit" | null, board?: Board }) => void