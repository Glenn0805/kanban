import { Board, Card, List } from 'Shared/type/KanbanType';
import { DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

function findContainer(listId: UniqueIdentifier | undefined, lists: List[] | undefined) {
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

export const handleDragEnd = (event: DragEndEvent, lists: List[], boarId: string, boards: Board[]) => {
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
    const currentBoard: Board = boards.filter(board => board.boardId === boarId)[0]


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
        return {
            payload: {
                data: [
                    ...boards.filter(board => board.boardId !== boarId),
                    currentBoard
                ],
                activeCard: null
            }
        }
    }
}

export const handleDragStart = (event: DragStartEvent, lists: List[]) => {
    const { active } = event;
    const { data, id } = active;
    const current = data.current
    const currentList: List = lists.filter(list => list.listId === current?.sortable.containerId)[0]
    const cards: Card[] = currentList.cards
    const activeCard = cards.filter((item) => item.id == id)[0]
    return {
        payload: {
            activeCard: activeCard
        }
    }
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
        let newCards: Card[] = []
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
    console.log(newBoard)

    return {
        payload: {
            data: [
                ...boards.filter(board => board.boardId !== boardId),
                newBoard
            ],
        }
    }
}