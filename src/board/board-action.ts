import { AddEditBoardModalType, AddEditCardModalType, AddEditListModalType, Board, CardType, List } from 'Shared/type/KanbanType';
import { DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { boardStore } from './board-store';
import { KanbanData } from './type/BoardType';


const setStateAction = (payload: KanbanData | Partial<KanbanData>, actionType: string) => {
    boardStore.setState(() => ({
        ...payload
    }), false, actionType)
}

const findContainer = (listId: UniqueIdentifier | undefined, lists: List[] | undefined) => {
    if (!listId || !lists) return
    if (lists.some(list => list.id === listId)) {
        return listId
    }
    let containerId: string = ""
    lists.forEach((list) => {
        const { cards } = list
        cards.forEach((card) => {
            if (card.id == listId) {
                containerId = list.id
                return containerId
            }
        })
    })
    return containerId
}

export const handleDragEnd = (event: DragEndEvent, lists: List[], boardId: string, boards: Board[]) => {
    const { active, over } = event;
    const overId = over?.id;
    const activeId = active.id
    const oldIndex = active.data.current?.sortable.index
    const newIndex = over?.data.current?.sortable.index
    const currentBoard: Board = boards.filter(board => board.boardId === boardId)[0]

    if (lists.some(list => list.id === activeId)) {
        const newListOrder = arrayMove(currentBoard?.lists, oldIndex, newIndex)
        currentBoard.lists = newListOrder
        boards.forEach((board)=>{
            if(board.boardId==boardId){
                board.lists =[
                    ...newListOrder
                ]
            }
        })
    } else {
        const activeContainer = findContainer(activeId, lists);
        const overContainer = findContainer(overId, lists);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const newListId: string = overContainer.toString() || activeContainer.toString()
        const list: List = lists.filter(list => list.id == newListId)[0]




        const newCards = arrayMove(list.cards, oldIndex, newIndex);
        const newList = lists.map((list) => {
            if (list.id === newListId) {
                list.cards = newCards
            }
            return list
        })
        currentBoard.lists = newList
        boards.forEach((board)=>{
            if(board.boardId==boardId){
                board.lists =[
                    ...newList
                ]
            }
        })
        
    }
    if (active.id !== over?.id) {
        setStateAction({
            data: [
                ...boards
            ],
            activeCard: null,
            activeList:null

        }, "handleDragEnd")
    }
}

export const handleDragStart = (event: DragStartEvent, lists: List[]) => {
    const { active } = event;
    const { data, id } = active;
    const current = data.current
    const currentList = lists.filter(list => list.id === current?.sortable.containerId || list.id === id)[0]
    let activeCard:CardType | null = null;
    let activeList: List | null = null;
  
    if (lists.some(list => list.id === id)) {
        activeList = currentList
    } else {
        const cards: CardType[] = currentList.cards
        activeCard = cards.filter((item) => item.id == id)[0]
    }
    console.log(activeList)
    setStateAction({ activeCard: activeCard,activeList:activeList }, "handleDragStart")
}

export const handleDragOver = (event: DragOverEvent, lists: List[], boardId: string, boards: Board[]) => {
    const { active, over } = event;
    const overId = over?.id;
    const activeId = active.id
    const activeContainer = findContainer(activeId, lists);
    const overContainer = findContainer(overId, lists);
    if (!overContainer || !activeContainer || activeContainer === overContainer || lists.some(list => list.id === activeId)) {
        return;
    }

    const activeItems = lists.filter(list => list.id === activeContainer)
    const overItems = lists.filter(list => list.id === overContainer)



    const activeItemIndex: number = activeItems[0].cards.findIndex(card => card.id == activeId)
    const overItemIndex: number = overItems[0].cards.findIndex(card => card.id == overId)

    const currentBoard = boards.filter(board => board.boardId === boardId)[0]

    let newIndex: number
    if (lists.filter(list => list.id === overContainer).length > 0) {
        newIndex = overItems.length + 1
    } else {
        const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
            over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex = overItemIndex >= 0 ? overItemIndex + modifier : overItems.length + 1;
    }

    const newList: List[] = []

    lists.forEach((list) => {
        let newCards: CardType[] = []
        if (list.id !== activeContainer && list.id !== overContainer) {
            newList.push(list)
        }
        if (list.id === activeContainer) {
            newCards = activeItems[0].cards.filter(card => card.id != activeId)
            newList.push({
                id: list.id,
                listName: list.listName,
                color: list.color,
                cards: newCards
            })
        }

        if (list.id === overContainer) {
            newCards = [
                ...overItems[0].cards.slice(0, newIndex),
                activeItems[0].cards[activeItemIndex],
                ...overItems[0].cards.slice(newIndex, overItems[0].cards.length)
            ]
            newList.push({
                id: list.id,
                listName: list.listName,
                color: list.color,
                cards: newCards
            })
        }

    })
    const newBoard: Board = {
        boardId,
        boardName: currentBoard.boardName,
        lists: newList
    }

    boards.forEach((board)=>{
        if(board.boardId==boardId){
            board.lists =[
                ...newList
            ]
        }
    })

    setStateAction(
        {
            data: [...boards]
        }, "handleDragOver"
    )
}

export const toggleAddEditModal = (addEditModal: AddEditCardModalType, card?: CardType) => {
    const { isAddEditModalOpen, actionType = null, listName, listId } = addEditModal
    const obj: { modal: AddEditCardModalType, card: CardType } = {
        modal: {
            isAddEditModalOpen: !isAddEditModalOpen,
            actionType: actionType,
            listName: listName,
            listId: listId
        },
        card: {
            cardName: "",
            id: "",
            cardLevel: "medium"
        }
    }


    if (actionType === "edit" && card) {
        obj.card = { ...card }
    }
    setStateAction({
        addEditModal: {
            ...obj
        }
    }, "toggleAddEditModal")
}

export const addCardToList = (card: CardType, boards: Board[], boardId: string, listId: string) => {
    const currentBoard: Board = boards.filter(board => board.boardId === boardId)[0]
    if (!currentBoard) return
    const currentList = currentBoard.lists

    const newList = currentList.map(list => {
        if (list.id == listId) {
            list.cards = [...list.cards, card]
        }
        return list
    })

    const newBoard: Board = {
        boardId,
        boardName: currentBoard.boardName,
        lists: [
            ...newList,
        ]
    }
    boards.forEach((board)=>{
        if(board.boardId==boardId){
            board.lists =[
                ...newList
            ]
        }
    })

    setStateAction({
        data: [
            ...boards
        ]
    }, "addCardToList")

}

export const updateCardToList = (card: CardType, boards: Board[], boardId: string, listId: string, cardId: UniqueIdentifier) => {
    const currentBoard: Board = boards.filter(board => board.boardId === boardId)[0]
    if (!currentBoard) return
    const currentList = currentBoard.lists
    console.log(listId)
    const newList = currentList.map(list => {
        if (list.id == listId) {
            const newCard = list.cards.map((cardInfo) => {
                if (cardInfo.id == cardId) {
                    cardInfo = {
                        ...card
                    }
                }
                return cardInfo
            })
            list.cards = newCard
        }
        return list
    })

    const newBoard: Board = {
        boardId,
        boardName: currentBoard.boardName,
        lists: [
            ...newList,
        ]
    }

    boards.forEach((board)=>{
        if(board.boardId==boardId){
            board.lists =[
                ...newList
            ]
        }
    })

    setStateAction({
        data: [...boards]
    }, "updateCardToList")

}

export const deleteCardToList = (boards: Board[], boardId: string, listId: string, cardId: UniqueIdentifier) => {
    const currentBoard: Board = boards.filter(board => board.boardId === boardId)[0]
    if (!currentBoard) return
    const currentList = currentBoard.lists

    const newList = currentList.map(list => {
        if (list.id == listId) {
            const newCard = list.cards.filter(card => card.id != cardId)
            list.cards = newCard
        }
        return list
    })

    const newBoard: Board = {
        boardId,
        boardName: currentBoard.boardName,
        lists: [
            ...newList,
        ]
    }

    boards.forEach((board)=>{
        if(board.boardId==boardId){
            board.lists =[
                ...newList
            ]
        }
    })
    setStateAction({
        data: [...boards]
    }, "deleteCardToList")

}

export const toggleAddEditListModal = (addEditModal: AddEditListModalType, list?: List) => {
    const { isAddEditModalOpen, actionType = null, boardName, boardId } = addEditModal
    const obj: { modal: AddEditListModalType, list: List } = {
        modal: {
            isAddEditModalOpen: !isAddEditModalOpen,
            actionType: actionType,
            boardName,
            boardId
        },
        list: {
            cards: [],
            id: "",
            listName: ""
        }
    }


    if (actionType === "edit" && list) {
        obj.list = { ...list }
    }
    setStateAction({
        addEditListModal: {
            ...obj
        }
    }, "toggleAddEditListModal")
}

export const addListToBoard = (boards: Board[], boardId: string, list: List) => {
    const currentBoard: Board = boards.filter(board => board.boardId === boardId)[0]
    if (!currentBoard) return
    const currentList = currentBoard.lists

    const newBoard: Board = {
        boardId,
        boardName: currentBoard.boardName,
        lists: [
            ...currentList,
            list
        ]
    }

    boards.forEach((board)=>{
        if(board.boardId==boardId){
            board.lists =[
                ...currentList,
                list
            ]
        }
    })

    setStateAction({
        data: [...boards
            // ...boards.filter(board => board.boardId !== boardId),
            // newBoard
        ]
    }, "addListToBoard")

}

export const updateListToBoard = (boards: Board[], boardId: string, list: List) => {
    const currentBoard: Board = boards.filter(board => board.boardId === boardId)[0]
    if (!currentBoard) return
    const currentList = currentBoard.lists

    currentList.forEach((listItem) => {
        if (listItem.id === list.id) {
            listItem.cards = list.cards
            listItem.color = list.color
            listItem.listName = list.listName
        }
    })

    const newBoard: Board = {
        boardId,
        boardName: currentBoard.boardName,
        lists: [
            ...currentList,
        ]
    }

    boards.forEach((board)=>{
        if(board.boardId==boardId){
            board.lists =[
                ...currentList,
            ]
        }
    })


    setStateAction({
        data: [
            ...boards
        ]
    }, "updateListToBoard")

}

export const deleteListToBoard = (boards: Board[], boardId: string, listId: string) => {
    const currentBoard: Board = boards.filter(board => board.boardId === boardId)[0]
    if (!currentBoard) return
    const currentList = currentBoard.lists.filter((list) => list.id != listId)

    const newBoard: Board = {
        boardId,
        boardName: currentBoard.boardName,
        lists: [
            ...currentList,
        ]
    }

    boards.forEach((board)=>{
        if(board.boardId==boardId){
            board.lists =[
                ...currentList,
            ]
        }
    })


    setStateAction({
        data: [
            ...boards
        ]
    }, "deleteListToBoard")

}


export const clearList = (boards: Board[], boardId: string, listId: string) => {
    const currentBoard: Board = boards.filter(board => board.boardId === boardId)[0]
    if (!currentBoard) return
    const currentList = currentBoard.lists

    currentList.forEach((list) => {
        if (list.id == listId) {
            list.cards = []
        }
    })

    const newBoard: Board = {
        boardId,
        boardName: currentBoard.boardName,
        lists: [
            ...currentList,
        ]
    }

    boards.forEach((board)=>{
        if(board.boardId==boardId){
            board.lists =[
                ...currentList,
            ]
        }
    })


    
    // console.log(newBoard)
    setStateAction({
        data: [
            ...boards
        ]
    }, "clearList")

}


export const toggleAddEditBoardModal = (addEditModal: AddEditBoardModalType, board?: Board) => {
    const { isAddEditModalOpen, actionType = null } = addEditModal
    const obj: { modal: AddEditBoardModalType, board: Board } = {
        modal: {
            isAddEditModalOpen: !isAddEditModalOpen,
            actionType: actionType,
        },
        board: {
            lists: [],
            boardId: "",
            boardName: ""
        }
    }

    if (actionType === "edit" && board) {
        obj.board = { ...board }
    }
    setStateAction({
        addEditBoardModal: {
            ...obj
        }
    }, "toggleAddEditBoardModal")
}

export const addBoard = (newBoard:Board,boards:Board[]) =>{
    setStateAction({
        data:[...boards,newBoard]
    },"addBoard")
}
