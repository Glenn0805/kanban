import React, { useState } from 'react'
import { Card, Badge } from 'antd'
import CardComponent from './CardComponent'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arraySwap, arrayMove } from '@dnd-kit/sortable'

type Props = {
    color?: string,
    title: string,
    listId: string,
    items?: { id: number, title: string }[]
}

const ListComponent = (props: Props) => {
    const { color = "#1677ff", title, listId, items } = props
    const { setNodeRef } = useDroppable({
        id: listId
    })

    return (
        <>
            <SortableContext items={items || []} id={listId} strategy={verticalListSortingStrategy}>
                <Card
                    ref={setNodeRef}
                    title={title}
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
                        items?.map((card) => <CardComponent color="red " id={card.id} key={card.id} title={card.title} />)
                    }


                </Card>

            </SortableContext>
        </>
    )
}

export default ListComponent