import { Button, Card, Popover, Popconfirm } from 'antd'
import CardComponent from './CardComponent'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { List } from 'Shared/type/KanbanType'
import { VscAdd } from 'react-icons/vsc'
import { ToggleAddEditListModal, ToggleAddEditModal } from '../type/BoardType'
import { CgMoreAlt, CgClose } from 'react-icons/cg'
import { useState } from 'react'

type Props = {
    list: List,
    openModal: ToggleAddEditModal,
    toggleListModal: ToggleAddEditListModal,
    handleDeleteList: (listId: string) => void
}

const ListComponent = (props: Props) => {
    const { list, openModal, toggleListModal, handleDeleteList } = props
    const [isMoreOptionOpen, setIsMoreOptionOpen] = useState<boolean>(false)
    const { listName, listId, cards, color = "#1677ff", } = list
    const { setNodeRef } = useDroppable({
        id: listId
    })

    const toggleMoreOption = (newOpen: boolean) => {
        setIsMoreOptionOpen(newOpen)
    }
    const optionContent = (
        <>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center text-base justify-between gap-4 cursor-pointer'>
                    List Action
                    <CgClose onClick={() => {
                        toggleMoreOption(false)
                    }} className="text-lg" />
                </div>

                <hr />
                <Button
                    onClick={() => {
                        toggleListModal({ actionType: "edit", list })
                        toggleMoreOption(false)
                    }}>Edit</Button>
                <Popconfirm
                    title="Delete List"
                    description="Are you sure to delete this List?"
                    onConfirm={()=>{
                          handleDeleteList(listId)
                            toggleMoreOption(false)
                    }}
                    okButtonProps={{danger:true}}
                    okText="Delete"
                    cancelText="No"
                    >

                    <Button
                        type='primary'
                        danger>Delete</Button>
                </Popconfirm>
            </div>

        </>
    )
    const renderMoreOption = (
        <Popover
            open={isMoreOptionOpen}
            onOpenChange={toggleMoreOption}
            trigger="click"
            placement='right'
            content={optionContent}>
            <CgMoreAlt className="text-xl cursor-pointer" />
        </Popover>
    )


    return (
        <>
            <SortableContext items={cards || []} id={listId} strategy={verticalListSortingStrategy}>
                <Card
                    ref={setNodeRef}
                    extra={renderMoreOption}
                    bordered={false}
                    title={listName.toUpperCase()}
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
                                onClick={() => {
                                    openModal({ actionType: "add", listName, listId })
                                }}
                            > Add a Card
                            </Button>
                        </div>
                    ]}
                >
                    {
                        cards?.map((card) => <CardComponent list={list} key={card.id} card={card} openModal={openModal} />)
                    }

                </Card>

            </SortableContext>

        </>
    )
}

export default ListComponent