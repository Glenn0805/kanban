import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { Board, List } from 'Shared/type/KanbanType'
import ListComponent from './components/ListComponent'
import useBoardStore from './board-store'
import { closeAddEditModal, handleDragEnd, handleDragOver, handleDragStart, toggleAddEditModal } from './board-action'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import ActiveCardComponent from './components/ActiveCardComponent'
import AddEditCardModal from './components/AddEditCardModal'


const BoardContainer = (props: Board) => {
    const { boardId, boardName, lists } = props
    const boardStore = useBoardStore()
    const { dispatch, data, activeCard ,addEditModal} = boardStore

    const toggleModal = (actionType: "add" | "edit" | null,list:List| NonNullable<unknown>)=>{
        dispatch(toggleAddEditModal({isAddEditModalOpen:addEditModal.modal.isAddEditModalOpen,actionType},list))
    }

    const renderLists = lists?.map((list, id) => (
        <ListComponent key={id} list={list} openModal={toggleModal}/>
    ))

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
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
                        <DragOverlay>{activeCard?.id ? <ActiveCardComponent cardName={activeCard.cardName} id={activeCard.id} /> : null}</DragOverlay>
                    </DndContext>
                </div>
            </div>
            <AddEditCardModal modal={addEditModal.modal} list={addEditModal.list} key={"addEditCardModal"} onClose={toggleModal}/>

        </>
    )
}

export default BoardContainer