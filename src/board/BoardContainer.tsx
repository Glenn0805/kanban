import { DndContext, DragOverlay, KeyboardSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { Board, CardType} from 'Shared/type/KanbanType'
import ListComponent from './components/ListComponent'
import useBoardStore from './board-store'
import {addCardToList, handleDragEnd, handleDragOver, handleDragStart, toggleAddEditModal, updateCardToList } from './board-action'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import ActiveCardComponent from './components/ActiveCardComponent'
import AddEditCardModal from './components/AddEditCardModal'
import { MouseSensor,PointerSensor } from './config/CustomSensor'
import { ToggleAddEditModal } from './type/BoardType'


const BoardContainer = (props: Board) => {
    const { boardId, boardName, lists } = props
    const boardStore = useBoardStore()
    const { dispatch, data, activeCard ,addEditModal} = boardStore

    const toggleModal : ToggleAddEditModal = ({actionType,listName,listId,card})=>{
        dispatch(toggleAddEditModal({
                isAddEditModalOpen:addEditModal.modal.isAddEditModalOpen,
                listName:listName,
                listId:listId,
                actionType:actionType},
                card))
    }

    const renderLists = lists?.map((list) => (
        <ListComponent key={list.listId} list={list} openModal={toggleModal}/>
    ))

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddCard = (card:CardType,listId:string)=>{
        dispatch(addCardToList(card,data,boardId,listId))
    }

    const handleUpdateCard = (card:CardType,listId:string,cardId:string)=>{
        dispatch(updateCardToList(card,data,boardId,listId,cardId))
    }
    return (
        <>
            <div className='flex-col'>
                <h1 className='text-yellow-300'>{boardName}</h1>
                <div className='p-10 flex gap-9'>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        id={boardId}
                        onDragStart={(event) => {
                            dispatch(handleDragStart(event, lists))
                        }}
                        onDragOver={(event)=>{
                            dispatch(handleDragOver(event,lists,boardId,data))
                        }}
                        onDragEnd={(event) => {
                            dispatch(handleDragEnd(event, lists, boardId, data))
                        }}>
                        {renderLists}
                        <DragOverlay>{activeCard?.id ? <ActiveCardComponent cardLevel={activeCard.cardLevel} cardName={activeCard.cardName} id={activeCard.id} /> : null}</DragOverlay>
                    </DndContext>
                </div>
            </div>
            <AddEditCardModal addCard={handleAddCard} updateCard={handleUpdateCard} modal={addEditModal.modal} card={addEditModal.card} key={"addEditCardModal"} onClose={toggleModal}/>

        </>
    )
}

export default BoardContainer