import { UniqueIdentifier } from '@dnd-kit/core'

export type CardLabel ={
    label:string,
    color:string
}

export type CardType = {
    id: string,
    cardName: string,
    description?:string,
    cardLevel:string,
    cardLabel?:CardLabel[]
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
    listName?: string ,
    listId?:string
}

export type AddEditListModalType = {
    isAddEditModalOpen:boolean,
    actionType?: "add" | "edit" | null,
    boardName?: string ,
    boardId?:string
}