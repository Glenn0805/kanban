import { AddEditCardModalType, Board, CardType, List } from 'Shared/type/KanbanType';
import { DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { boardStore } from './board-store';
import { KanbanData } from './type/BoardType';


const setStateAction = (payload, actionType: string) => {
    boardStore.setState(() => ({
        ...payload
    }), false, actionType)
}

const findContainer = (listId: UniqueIdentifier | undefined, lists: List[] | undefined) => {
    if (!listId || !lists) return
    if (lists.some(list => list.listId === listId)) {
        return listId
    }
    let containerId: string = ""
    lists.forEach((list) => {
        const { cards } = list
        cards.forEach((card) => {
            if (card.id == listId) {
                containerId = list.listId
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
    const list: List = lists.filter(list => list.listId == newListId)[0]
    const currentBoard: Board = boards.filter(board => board.boardId === boardId)[0]


    const oldIndex = active.data.current?.sortable.index
    const newIndex = over?.data.current?.sortable.index

    const newCards = arrayMove(list.cards, oldIndex, newIndex);
    const newList = lists.map((list) => {
        if (list.listId === newListId) {
            list.cards = newCards
        }
        return list
    })
    currentBoard.lists = newList

    if (active.id !== over?.id) {

        boardStore.setState((state) => (
            {
                ...state,
                data: [
                    ...boards.filter(board => board.boardId !== boardId),
                    currentBoard
                ],
                activeCard: null
            }
        ))
        setStateAction({
            data: [
                ...boards.filter(board => board.boardId !== boardId),
                currentBoard
            ],
            activeCard: null

        }, "handleDragEnd")
    }
}

export const handleDragStart = (event: DragStartEvent, lists: List[]) => {
    const { active } = event;
    const { data, id } = active;
    const current = data.current
    const currentList: List = lists.filter(list => list.listId === current?.sortable.containerId)[0]
    const cards: CardType[] = currentList.cards
    const activeCard = cards.filter((item) => item.id == id)[0]

    setStateAction({ activeCard: activeCard }, "handleDragStart")
}

export const handleDragOver = (event: DragOverEvent, lists: List[], boardId: string, boards: Board[]) => {
    const { active, over } = event;
    const overId = over?.id;
    const activeId = active.id
    const activeContainer = findContainer(activeId, lists);
    const overContainer = findContainer(overId, lists);
    if (!overContainer || !activeContainer || activeContainer === overContainer) {
        return;
    }

    const activeItems = lists.filter(list => list.listId === activeContainer)
    const overItems = lists.filter(list => list.listId === overContainer)



    const activeItemIndex: number = activeItems[0].cards.findIndex(card => card.id == activeId)
    const overItemIndex: number = overItems[0].cards.findIndex(card => card.id == overId)

    const currentBoard = boards.filter(board => board.boardId === boardId)[0]

    let newIndex: number
    if (lists.filter(list => list.listId === overContainer).length > 0) {
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
        if (list.listId !== activeContainer && list.listId !== overContainer) {
            newList.push(list)
        }
        if (list.listId === activeContainer) {
            newCards = activeItems[0].cards.filter(card => card.id != activeId)
            newList.push({
                listId: list.listId,
                listName: list.listName,
                color: list.color,
                cards: newCards
            })
        }

        if (list.listId === overContainer) {
            newCards = [
                ...overItems[0].cards.slice(0, newIndex),
                activeItems[0].cards[activeItemIndex],
                ...overItems[0].cards.slice(newIndex, overItems[0].cards.length)
            ]
            newList.push({
                listId: list.listId,
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

    setStateAction(
        {
            data: [...boards.filter(board => board.boardId !== boardId),
                newBoard]
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
        if (list.listId == listId) {
            list.cards.push(card)
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

    setStateAction({
        data: [
            ...boards.filter(board => board.boardId !== boardId),
            newBoard
        ]
    }, "addCardToList")

}

export const updateCardToList = (card: CardType, boards: Board[], boardId: string, listId: string, cardId: UniqueIdentifier) => {
    const currentBoard: Board = boards.filter(board => board.boardId === boardId)[0]
    if (!currentBoard) return
    const currentList = currentBoard.lists

    const newList = currentList.map(list => {
        if (list.listId == listId) {
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
    setStateAction({
        data: [...boards.filter(board => board.boardId !== boardId),
            newBoard]
    }, "updateCardToList")

}

