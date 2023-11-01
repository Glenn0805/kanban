import { DndContext } from '@dnd-kit/core'
import { Board } from 'Shared/type/KanbanType'
import ListComponent from './components/ListComponent'


const BoardContainer = (props : Board) => {

    const {boardId,boardName,lists} = props

    

    const renderLists = lists?.map((list)=>(
        <ListComponent listId={list.listId} title={list.listName} items={list.cards || []}/>
    ))
    return (
        <>
            <DndContext>
                {renderLists}
            </DndContext>
        </>
    )
}

export default BoardContainer