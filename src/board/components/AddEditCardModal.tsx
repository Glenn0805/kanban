import { Button, Form, Input, Modal, Select, Space, Tag } from 'antd'
import { AddEditCardModalType, CardType } from 'src/shared/type/KanbanType'
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc'
import { IoMdAdd } from 'react-icons/io'
import { useEffect } from 'react'
import { ToggleAddEditModal } from '../type/BoardType'
type Props = {
    onClose:ToggleAddEditModal
    modal: AddEditCardModalType,
    card: CardType,
}
const AddEditCardModal = (props: Props) => {
    const { modal, onClose, card } = props
    const { actionType, isAddEditModalOpen,listName } = modal
    const { useForm, Item } = Form
    const [form] = useForm()
    const renderTitle = actionType == "add" ? (<> Add Card in <span className='text-[#1677ff]'>{listName || ""} </span> List</>) : (<>Update</>)

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

    const labels = [
        {
            label: 'TEST 1',
            color: 'red'
        },
        {
            label: 'TEST 2',
            color: 'blue'
        },
        {
            label: 'TEST 3',
            color: 'green'
        },
        {
            label: 'TEST 1',
            color: 'red'
        },
        {
            label: 'TEST 2',
            color: 'blue'
        },
        {
            label: 'TEST 3',
            color: 'green'
        },
        {
            label: 'TEST 1',
            color: 'red'
        },
        {
            label: 'TEST 2',
            color: 'blue'
        },
        {
            label: 'TEST 3',
            color: 'green'
        },
        {
            label: 'TEST 1',
            color: 'red'
        },
        {
            label: 'TEST 2',
            color: 'blue'
        },
        {
            label: 'TEST 3',
            color: 'green'
        },
        {
            label: 'TEST 1',
            color: 'red'
        },
        {
            label: 'TEST 2',
            color: 'blue'
        },
        {
            label: 'TEST 3',
            color: 'green'
        }
    ]

    

    const renderLabels = labels.map((label, id) => (
        <Tag className='h-6 mr-1' color={label.color} key={id}> {label.label}</Tag>
    ))
        useEffect(()=>{
            form.setFieldsValue({...card})
        },[form,card])
    return (
        <>
            <Modal
                forceRender
                width={700}
                onCancel={() => {
                    form.resetFields()
                    onClose(null)

                }}
                open={isAddEditModalOpen}
                title={renderTitle}
                footer={<Button onClick={()=>{
                    form.resetFields()

                }}>wew</Button>}>
                <Form
                    form={form}
                    layout='vertical'
                    initialValues={{cardName:"wow"}}
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
                            <Button size='small' className='bg-[#1677ff]' type='primary' icon={<IoMdAdd />} />
                        </Space>

                    </Item>



                    <Item label="Priority">
                        <Select
                            defaultValue={['medium']}
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