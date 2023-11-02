import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { Board } from 'Shared/type/KanbanType'
import ListComponent from './components/ListComponent'
import useBoardStore from './board-store'
import { handleDragEnd, handleDragOver, handleDragStart } from './board-action'
import CardComponent from './components/CardComponent'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'


const BoardContainer = (props: Board) => {
    const { boardId, boardName, lists } = props
    const boardStore = useBoardStore()
    const { dispatch, data, activeCard } = boardStore

    const renderLists = lists?.map((list, id) => (
        <ListComponent key={id} listId={list.listId} listName={list.listName} color='green' cards={list.cards} />
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
                        <DragOverlay>{activeCard?.id ? <CardComponent id={activeCard?.id} title={activeCard?.cardName} /> : null}</DragOverlay>
                    </DndContext>
                </div>
            </div>

        </>
    )
}

export default BoardContainer