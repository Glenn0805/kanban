import { Card } from 'antd'
import CardComponent from './CardComponent'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { List } from 'Shared/type/KanbanType'

const ListComponent = (props: List) => {
    const { color = "#1677ff", listName, listId, cards } = props
    const { setNodeRef } = useDroppable({
        id: listId
    })
    return (
        <>
            <SortableContext items={cards || []} id={listId} strategy={verticalListSortingStrategy}>
                <Card
                    ref={setNodeRef}
                    title={listName}
                    className='w-72 border min-h-[200px] max-h-[700px] border-t-8 p-0'
                    style={{ borderTopColor: color }}
                    headStyle={{ minHeight: "20px", padding: "8px" }}
                    bodyStyle={
                        {
                            padding: " 15px",
                            overflow: "hidden",
                            maxHeight: "600px",
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: 'column',
                            gap: '12px',
                        }
                    }
                >
                    {
                        cards?.map((card) => <CardComponent color="red " id={card.id} key={card.id} title={card.cardName} />)
                    }


                </Card>

            </SortableContext>
        </>
    )
}

export default ListComponent