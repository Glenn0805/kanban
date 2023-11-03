import { Button, Form, Input, Modal, Select, Space, Tag } from 'antd'
import { AddEditCardModalType, List } from 'src/shared/type/KanbanType'
import {FcHighPriority, FcLowPriority, FcMediumPriority} from 'react-icons/fc'
import {IoMdAdd} from 'react-icons/io'
type Props = {
    onClose:(actionType:"add" | "edit" | null,list:List|NonNullable<unknown>)=>void
    modal:AddEditCardModalType,
    list: List | null
}
const AddEditCardModal = (props: Props) => {
    const { modal, onClose, list } = props
    const {actionType, isAddEditModalOpen,} =modal
    const { useForm, Item } = Form
    const [form] = useForm()

    const renderTitle = actionType == "add" ? (<> Add Card in <span className='text-[#1677ff]'>{list?.listName || ""} </span> List</>) : (<>Update</>)

    const priorityOptions = [
        {
            value: 'high', 
            label: (<div className='flex items-center gap-2 text-sm'><FcHighPriority/> High</div>)
        },
        {
            value: 'medium', 
            label: (<div className='flex items-center gap-2'><FcMediumPriority/> Medium</div>)
        },
        {
            value: 'low', 
            label: (<div className='flex items-center gap-2'><FcLowPriority/> Low</div>)
        },];

    const labels= [
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

    const renderLabels = labels.map((label,id)=>(
        <Tag  className='h-6 mr-1' color={label.color} key={id}> {label.label}</Tag>
    ))

    return (
        <>
            <Modal
                width={700}
                onCancel={()=>{
                    onClose(null,{})
                }}
                open={isAddEditModalOpen}
                title={renderTitle}
                footer={<Button>wew</Button>}>
                <Form
                    form={form}
                    layout='vertical'
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
                        <Input placeholder='Enter Card Name' />

                    </Item>

                    <Item label="Labels">
                   <Space wrap size={[0,3]}>
                   {renderLabels}
                    <Button size='small' className='bg-[#1677ff]' type='primary' icon={<IoMdAdd/>}/>
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