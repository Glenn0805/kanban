import { useEffect } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { AddEditBoardModalType, Board } from 'src/shared/type/KanbanType'
import { v4 as uuidv4 } from 'uuid';
import { ToggleAddEditBoardModal } from '../type/BoardType';

interface Props {
    board: Board,
    addEditBoardModal: AddEditBoardModalType,
    handleAddBoard: (newBoard: Board) => void,
    onClose: ToggleAddEditBoardModal
}

const AddEditBoardModal = (props: Props) => {

    const { addEditBoardModal, board, handleAddBoard, onClose } = props
    const { actionType, isAddEditModalOpen } = addEditBoardModal
    const { Item, useForm } = Form
    const [form] = useForm()

    const renderHeader = actionType === "edit" ? "Edit Board" : "Add Board"

    const handleSubmit = () => {
        form.validateFields().then(() => {
            const newBoard: Board = form.getFieldsValue(true)
            if (actionType === 'add' || actionType === null) {
                handleAddBoard(newBoard)
            }

            if (actionType === 'edit') {
                // updateCard(newCard, listId || "", card.id)
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
                console.log("first")
            }}>Cancel</Button>
            <Button className='bg-[#1677ff]' type='primary' onClick={handleSubmit} htmlType="submit">
                {actionType === "edit" ? "Update Board" : "Create Board"}
            </Button>
        </div>
    )


    useEffect(() => {
        if (!board?.boardId) {
            board.boardId = uuidv4()
        }
        form.setFieldsValue(board)
    }, [form, board])

    return (
        <>
            <Modal
                forceRender
                title={renderHeader}
                open={isAddEditModalOpen}
                onCancel={() => {
                    form.resetFields()
                    onClose({ actionType: null })

                }}
                footer={renderModalFooter}>
                <Form
                    form={form}
                    layout='vertical'
                    name='boardForm'
                >
                    <Item
                        label="Board Name"
                        name="boardName"
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

export default AddEditBoardModal