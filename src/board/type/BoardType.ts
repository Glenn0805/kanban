import { AddEditCardModalType, Board, CardType, List } from 'src/shared/type/KanbanType'

export type KanbanData = {
    data: Board[] | [],
    activeCard: CardType | null,
    addEditModal: {
        modal: AddEditCardModalType,
        list: List | null
    }
}