import { Button, Card, Popover, App } from 'antd'
import CardComponent from './CardComponent'
import { useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { List } from 'Shared/type/KanbanType'
import { VscAdd } from 'react-icons/vsc'
import { ToggleAddEditListModal, ToggleAddEditModal } from '../type/BoardType'
import { CgMoreAlt, CgClose } from 'react-icons/cg'
import { ReactNode, useState } from 'react'
import { CSS } from '@dnd-kit/utilities';
import { RiDragMove2Fill } from "react-icons/ri";

type Props = {
    list: List,
    openModal: ToggleAddEditModal,
    toggleListModal: ToggleAddEditListModal,
    handleDeleteList: (listId: string) => void,
    handleClearList: (listId: string) => void,
}

const ListComponent = (props: Props) => {
    const { list, openModal, toggleListModal, handleDeleteList, handleClearList } = props
    const [isMoreOptionOpen, setIsMoreOptionOpen] = useState<boolean>(false)
    const { listName, id, cards, color = "#1677ff" } = list
    const { setNodeRef } = useDroppable({
        id
    })

    const { setNodeRef: listSetNodeRef, attributes,
        listeners,
        transform,
        isDragging,
        transition, } = useSortable({
            id: id
        })

    const { notification, modal } = App.useApp()


    const showNotif = (message: string) => {
        notification.info({ message: message, duration: 3, placement: "topRight" })
    }

    const showConfirmation = (title: string, content: ReactNode, onOkFunc: VoidFunction) => {
        modal.confirm({
            title,
            content,
            onOk() {
                onOkFunc()
            },
            onCancel() {
            },
            okText: "Yes",
            cancelText: "Cancel",
            okButtonProps: { type: "primary", className: "bg-[#1677ff]" }
        })
    }

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
                    type='text'
                    onClick={() => {
                        toggleListModal({ actionType: "edit", list })
                        toggleMoreOption(false)
                    }}>Edit List</Button>
                <Button
                    type='text'
                    onClick={() => {
                        showConfirmation(
                            "Delete List",
                            <>Are you sure to clear  <span className='text-[#1677ff] font-bold'>{listName?.toUpperCase() || ""}</span> list ?</>,
                            () => {
                                handleClearList(id)
                                showNotif("List Cleared!")
                            }
                        )
                        toggleMoreOption(false)
                    }}
                >Clear List</Button>
                <Button
                    type='primary'
                    danger
                    onClick={() => {
                        showConfirmation(
                            "Clear List",
                            <>Are you sure to delete  <span className='text-[#1677ff] font-bold'>{listName?.toUpperCase() || ""}</span> list ?</>,
                            () => {
                                handleDeleteList(id)
                                showNotif("List Deleted!")
                            }
                        )
                        toggleMoreOption(false)
                    }}>Delete List</Button>
            </div>

        </>
    )
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? .60 :1
    };
    const renderMoreOption = (
        <>
            <div className='flex gap-2'>
                <Popover
                    open={isMoreOptionOpen}
                    onOpenChange={toggleMoreOption}
                    trigger="click"
                    placement='right'
                    content={optionContent}>
                    <CgMoreAlt className="text-xl cursor-pointer" />
                </Popover>
                <span
                    {...listeners}
                >
                    <RiDragMove2Fill />
                </span>
            </div>
        </>
    )



    return (
        <>
            <div
                ref={listSetNodeRef}
                {...attributes}
                style={style}
                className='w-96 h-full max-h-[700px] p-0'>
                <SortableContext
                    items={cards || []}
                    id={id}
                    strategy={verticalListSortingStrategy}>
                    <Card
                        ref={setNodeRef}
                        extra={renderMoreOption}
                        bordered={false}
                        title={listName.toUpperCase()}
                        className='border-t-8'
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
                                        openModal({ actionType: "add", listName, id })
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

            </div>
        </>
    )
}

export default ListComponent