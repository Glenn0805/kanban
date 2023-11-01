import { UniqueIdentifier } from '@dnd-kit/core'

export type Card = {
    id: UniqueIdentifier,
    cardName: string
}

export type List = {
    listId: UniqueIdentifier,
    listName: string,
    cards?: Card[]
}

export type Board = {
    boardId: UniqueIdentifier,
    boardName: string,
    lists?: List[]
}