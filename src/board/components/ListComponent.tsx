import { Button, Card } from 'antd'
import CardComponent from './CardComponent'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { List } from 'Shared/type/KanbanType'
import { VscAdd } from 'react-icons/vsc'
import { ToggleAddEditModal } from '../type/BoardType'

type Props={
    list:List,
    openModal: ToggleAddEditModal
}

const ListComponent = (props:Props) => {
    const {list,openModal } = props
    const { listName, listId, cards, color = "#1677ff",} =list
    const { setNodeRef } = useDroppable({
        id: listId
    })


    return (
        <>
            <SortableContext items={cards || []} id={listId} strategy={verticalListSortingStrategy}>
                <Card
                    ref={setNodeRef}
                    bordered={false}
                    title={listName}
                    className='w-96 h-full max-h-[700px] border-t-8 p-0'
                    style={{ borderTopColor: color }}
                    headStyle={{ minHeight: "20px", padding: "8px" }}
                    bodyStyle={
                        {
                            minHeight: '100px',
                            padding: " 15px",
                            paddingBottom: 0,
                            overflow: "hidden",
                            overflowY: "auto",
                            maxHeight: "600px",
                            display: "flex",
                            flexDirection: 'column',
                            gap: '12px',
                        }
                    }
                    actions={[
                        <div className='px-3'>
                            <Button
                                type='text'
                                className='flex w-full justify-center items-center'
                                icon={<VscAdd className="text-base" />}
                                onClick={()=>{
                                    openModal({actionType:"add",listName,listId})
                                }}
                            > Add a Card
                            </Button>
                        </div>
                    ]}
                >
                    {
                        cards?.map((card) => <CardComponent list={list} key={card.id} card={card} openModal={openModal}/>)
                    }

                </Card>

            </SortableContext>

        </>
    )
}

export default ListComponent