import { Button, Form, Input, Modal, Select, Space, Tag, App } from 'antd'
import { AddEditCardModalType, CardType, CardLabel } from 'src/shared/type/KanbanType'
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc'
import { IoMdAdd } from 'react-icons/io'
import { useEffect } from 'react'
import { ToggleAddEditModal } from '../type/BoardType'
import { v4 as uuidv4 } from 'uuid';
import { UniqueIdentifier } from '@dnd-kit/core'
type Props = {
    onClose: ToggleAddEditModal
    addEditModal: AddEditCardModalType,
    card: CardType,
    addCard: (card: CardType, listId: string) => void,
    updateCard: (card: CardType, listId: string, cardId: UniqueIdentifier) => void,
    handleDeleteCard: (listId: string, cardId: string) => void
}
const AddEditCardModal = (props: Props) => {
    const { addEditModal, onClose, card, addCard, updateCard, handleDeleteCard } = props
    const { actionType, isAddEditModalOpen, listName, listId } = addEditModal
    const { useForm, Item } = Form
    const [form] = useForm()
    const renderTitle = actionType == "add" ? (<> Add Card in <span className='text-[#1677ff]'>{listName?.toUpperCase() || ""} </span> List</>) : (<>Update</>)

    const { modal, notification } = App.useApp()

    const priorityOptions = [
        {
            value: 'high',
            label: (<div className='flex items-center gap-2 text-sm'><FcHighPriority /> High</div>)
        },
        {
            value: 'medium',
            label: (<div className='flex items-center gap-2'><FcMediumPriority /> Medium</div>)
        },
        {
            value: 'low',
            label: (<div className='flex items-center gap-2'><FcLowPriority /> Low</div>)
        },];

    const labels: CardLabel[] = [
        // {
        //     label: 'TEST 1',
        //     color: 'red'
        // },
        // {
        //     label: 'TEST 2',
        //     color: 'blue'
        // },
        // {
        //     label: 'TEST 3',
        //     color: 'green'
        // },
        // {
        //     label: 'TEST 1',
        //     color: 'red'
        // },
        // {
        //     label: 'TEST 2',
        //     color: 'blue'
        // },
        // {
        //     label: 'TEST 3',
        //     color: 'green'
        // },
        // {
        //     label: 'TEST 1',
        //     color: 'red'
        // },
        // {
        //     label: 'TEST 2',
        //     color: 'blue'
        // },
        // {
        //     label: 'TEST 3',
        //     color: 'green'
        // },
        // {
        //     label: 'TEST 1',
        //     color: 'red'
        // },
        // {
        //     label: 'TEST 2',
        //     color: 'blue'
        // },
        // {
        //     label: 'TEST 3',
        //     color: 'green'
        // },
        // {
        //     label: 'TEST 1',
        //     color: 'red'
        // },
        // {
        //     label: 'TEST 2',
        //     color: 'blue'
        // },
        // {
        //     label: 'TEST 3',
        //     color: 'green'
        // }
    ]



    const renderLabels = labels?.map((label, id) => (
        <Tag className='h-6 mr-1' color={label.color} key={id}> {label.label}</Tag>
    ))
    useEffect(() => {
        if (!card.id) {
            card.id = uuidv4()
        }
        form.setFieldsValue({ ...card })
    }, [form, card])
    const formCardDefaultVal = {
        cardLevel: 'medium',
        description: "",
    }

    const handleSubmit = () => {
        form.validateFields().then(() => {
            const newCard: CardType = form.getFieldsValue(true)

            if (actionType === 'add') {
                addCard(newCard, listId || "")
            }

            if (actionType === 'edit') {
                updateCard(newCard, listId || "", card.id)
            }
            form.resetFields()
            onClose({ actionType: null })
        }).catch(error => {
            console.log(error)
        })
    }

    const showNotif = () => {
        notification.info({ message: "Card Deleted!", duration: 3, placement: "topLeft" })
    }

    const showConfirmation = () => {
        modal.confirm({
            title: "Delete Card",
            content: "Are you sure to delete this Card ?",
            onOk() {
                if (listId) {
                    handleDeleteCard(listId, card.id)
                    showNotif()
                    onClose({ actionType: null })
                }
            },
            onCancel() {
            },
            okText: "Yes,Delete Card",
            cancelText: "Cancel",
            okButtonProps: { type: "primary", className: "bg-[#1677ff]" }
        })
    }

    const renderModalFooter = (
        <div className='flex justify-between'>
            <div>
                {
                    actionType == "edit" && (
                        <Button
                            danger
                            type='primary'
                            onClick={showConfirmation}
                        >Delete</Button>
                    )}
            </div>
            <div>
                <Button onClick={() => {
                    onClose({ actionType: null })
                    form.resetFields()
                }}>Cancel</Button>
                <Button className='bg-[#1677ff]' type='primary' onClick={handleSubmit} htmlType="submit">
                    {actionType === "add" ? "Create Card" : "Update Card"}
                </Button>
            </div>
        </div>

    )

    return (
        <>
            <Modal
                forceRender
                width={700}
                onCancel={() => {
                    form.resetFields()
                    onClose({ actionType: null })

                }}
                open={isAddEditModalOpen}
                title={renderTitle}
                footer={renderModalFooter}>
                <Form
                    form={form}
                    layout='vertical'
                    initialValues={formCardDefaultVal}
                    name='cardForm'
                    // onFinish={handleSubmit}
                    scrollToFirstError
                >

                    <Item
                        required
                        label="Card Name"
                        name="cardName"
                        rules={[
                            { required: true, },
                            { min: 3, max: 20 },
                        ]}
                    >
                        <Input placeholder='Enter Card Name' value={"asdasdas"} />
                    </Item>

                    <Item label="Labels">
                        <Space wrap size={[0, 3]}>
                            {renderLabels}
                            <Button size='small' type='default' icon={<IoMdAdd />} />
                        </Space>

                    </Item>



                    <Item label="Priority" name="cardLevel">
                        <Select
                            options={priorityOptions}
                        />
                    </Item>

                    <Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea placeholder='Enter Card Description' />

                    </Item>
                </Form>

            </Modal>
        </>
    )
}

export default AddEditCardModal