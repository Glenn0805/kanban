import { UniqueIdentifier } from '@dnd-kit/core'

export type CardType = {
    id: UniqueIdentifier,
    cardName: string,
    hasLabel?:boolean,
    labelColor?:string
}

export type List = {
    listId: string,
    listName: string,
    color?:string,
    cards: CardType[] | []
}

export type Board = {
    boardId: string,
    boardName: string,
    lists: List[] | []
}

export type KanbanData ={
    data : Board[] | [],
    activeCard:CardType | null
}