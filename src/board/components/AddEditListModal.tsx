import { useEffect } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { AddEditListModalType, List } from 'src/shared/type/KanbanType'
import { v4 as uuidv4 } from 'uuid';
import { ToggleAddEditListModal } from '../type/BoardType';

type Props = {
    modal: AddEditListModalType,
    list: List,
    onClose: ToggleAddEditListModal,
    handleAddList: (list: List) => void,
    handleUpdateList:(list:List)=>void
}
const AddEditListModal = (props: Props) => {
    const { modal, list, onClose,handleAddList,handleUpdateList } = props
    const { isAddEditModalOpen, actionType, boardId, boardName } = modal
    const { Item, useForm } = Form
    const [form] = useForm()
    const renderModalHeader = actionType == "add" ? (<> Add List in <span className='text-[#1677ff]'>{boardName?.toUpperCase() || ""} </span> Board</>) : (<>Update</>)

    const handleSubmit = () => {
        form.validateFields().then(() => {
            const newList: List = form.getFieldsValue(true)

            if (actionType === 'add') {
                handleAddList(newList)
            }

            if (actionType === 'edit') {
                handleUpdateList(newList)
            }
            form.resetFields()
            onClose({ actionType: null })
        }).catch(error => {
            console.log(error)
        })

    }
    const renderModalFooter = (
        <div>
            <Button onClick={() => {
                 onClose({ actionType: null })
            }}>Cancel</Button>
            <Button className='bg-[#1677ff]' type='primary' onClick={handleSubmit} htmlType="submit">
                {actionType === "add" ? "Create List" : "Update List"}
            </Button>
        </div>
    )

    useEffect(() => {
        if (!list.listId) {
            list.listId = uuidv4()
        }
        form.setFieldsValue(list)
    }, [form, list])
    return (
        <>
            <Modal
                forceRender
                onCancel={() => {
                    form.resetFields()
                    onClose({ actionType: null })

                }}
                open={isAddEditModalOpen}
                title={renderModalHeader}
                width={700}
                footer={renderModalFooter}>
                <Form
                    form={form}
                    layout='vertical'
                    name='listForm'
                >
                    <Item
                        label="List Name"
                        name="listName"
                        rules={[{ required: true, min: 3 }]}>
                        <Input
                            placeholder='Enter List Name'
                        />
                    </Item>

                </Form>

            </Modal>
        </>
    )
}

export default AddEditListModal