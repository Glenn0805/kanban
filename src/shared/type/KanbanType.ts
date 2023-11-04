import { UniqueIdentifier } from '@dnd-kit/core'

export type CardType = {
    id: UniqueIdentifier | string,
    cardName: string,
    hasLabel?:boolean,
    labelColor?:string
}

export type List = {
    listId: string,
    listName: string,
    color?:string,
    cards: CardType[] | [],
}

export type Board = {
    boardId: string,
    boardName: string,
    lists: List[] | []
}

export type AddEditCardModalType = {
    isAddEditModalOpen:boolean,
    actionType?: "add" | "edit" | null,
    listName?: string
}
