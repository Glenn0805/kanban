import { UniqueIdentifier } from '@dnd-kit/core'

export type Card = {
    id: UniqueIdentifier,
    cardName: string
}

export type List = {
    listId: string,
    listName: string,
    color?:string,
    cards: Card[] | []
}

export type Board = {
    boardId: string,
    boardName: string,
    lists: List[] | []
}

export type KanbanData ={
    data : Board[] | [],
    activeCard:Card | null
}