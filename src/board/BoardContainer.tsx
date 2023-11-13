import { DndContext, DragOverlay, KeyboardSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { Board, CardType, List } from 'Shared/type/KanbanType'
import ListComponent from './components/ListComponent'
import useBoardStore from './board-store'
import { addCardToList, addListToBoard, deleteCardToList, deleteListToBoard, handleDragEnd, handleDragOver, handleDragStart, toggleAddEditListModal, toggleAddEditModal, updateCardToList, updateListToBoard } from './board-action'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import ActiveCardComponent from './components/ActiveCardComponent'
import AddEditCardModal from './components/AddEditCardModal'
import { MouseSensor, PointerSensor } from './config/CustomSensor'
import { ToggleAddEditListModal, ToggleAddEditModal } from './type/BoardType'
import { Button, Card, Typography } from 'antd'
import AddEditListModal from './components/AddEditListModal'


const BoardContainer = (props: Board) => {
    const { boardId, boardName, lists } = props
    const boardStore = useBoardStore()
    const data = boardStore.data
    const activeCard = boardStore.activeCard
    const addEditModal = boardStore.addEditModal
    const addEditListModal = boardStore.addEditListModal

    const toggleModal: ToggleAddEditModal = ({ actionType, listName, listId, card }) => {
        toggleAddEditModal({
            isAddEditModalOpen: addEditModal.modal.isAddEditModalOpen,
            listName: listName,
            listId: listId,
            actionType: actionType
        },
            card)
    }

    const toggleListModal: ToggleAddEditListModal = ({ actionType, boardName, boardId, list }) => {
        toggleAddEditListModal({
            isAddEditModalOpen: addEditListModal.modal.isAddEditModalOpen,
            boardName,
            boardId,
            actionType: actionType
        },
            list)
    }

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddCard = (card: CardType, listId: string) => {
        addCardToList(card, data, boardId, listId)
    }

    const handleUpdateCard = (card: CardType, listId: string, cardId: UniqueIdentifier) => {
        updateCardToList(card, data, boardId, listId, cardId)
    }

    const handleDeleteCard = (listId: string, cardId: UniqueIdentifier) => {
        deleteCardToList(data, boardId, listId, cardId)
    }

    const handleAddList = (list: List) => {
        addListToBoard(data, boardId, list)
    }

    const handleUpdateList = (list: List) => {
        updateListToBoard(data, boardId, list)
    }

    const handleDeleteList = (listId: string) => {
        deleteListToBoard(data, boardId, listId)
    }

    const renderLists = lists?.map((list) => (
        <ListComponent
            key={list.listId}
            list={list}
            openModal={toggleModal}
            toggleListModal={toggleListModal}
            handleDeleteList={handleDeleteList}
        />
    ))
    return (
        <>
            <div className='flex-col p-4'>
                <Card className=' mb-4'>
                    <div className='flex gap-1'>
                        <Typography.Text className='text-2xl text-center font-semibold'>{boardName}</Typography.Text>
                        <Button type='text'
                            onClick={() => {
                                toggleListModal({ actionType: "add", boardName, boardId })
                            }}>Create List</Button>
                    </div>
                </Card>
                <div className=' flex gap-4 flex-nowrap'>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        id={boardId}
                        onDragStart={(event) => {
                            handleDragStart(event, lists)
                        }}
                        onDragOver={(event) => {
                            handleDragOver(event, lists, boardId, data)
                        }}
                        onDragEnd={(event) => {
                            handleDragEnd(event, lists, boardId, data)
                        }}>
                        {renderLists}
                        <DragOverlay>{activeCard?.id ? <ActiveCardComponent cardLevel={activeCard.cardLevel} cardName={activeCard.cardName} id={activeCard.id} /> : null}</DragOverlay>
                    </DndContext>
                </div>
            </div>
            <AddEditCardModal
                addCard={handleAddCard}
                updateCard={handleUpdateCard}
                addEditModal={addEditModal.modal}
                card={addEditModal.card}
                key={"addEditCardModal"}
                onClose={toggleModal}
                handleDeleteCard={handleDeleteCard}
            />
            <AddEditListModal
                modal={addEditListModal.modal}
                list={addEditListModal.list}
                key={"addEditListModal"}
                onClose={toggleListModal}
                handleAddList={handleAddList}
                handleUpdateList={handleUpdateList}
            />
        </>
    )
}

export default BoardContainer