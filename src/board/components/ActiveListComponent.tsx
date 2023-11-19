import { Button, Card,Popover } from 'antd'
import CardComponent from './CardComponent'
import { List } from 'Shared/type/KanbanType'
import { VscAdd } from 'react-icons/vsc'
import { RiDragMove2Fill } from "react-icons/ri";
import { CgMoreAlt } from 'react-icons/cg'

const ActiveListComponent = (props: List) => {
    const { cards, listName, color = "#1677ff"  } = props
    const renderMoreOption = (
        <>
            <div className='flex gap-2'>
                <Popover
                    trigger="click"
                    placement='right'
                   >
                    <CgMoreAlt className="text-xl cursor-pointer" />
                </Popover>
                <span
                >
                    <RiDragMove2Fill className="cursor-grabbing" />
                </span>
            </div>
        </>
    )
    return (
        <>
            <div
                className='w-96 h-full max-h-[700px] p-0 rotate-6 cursor-grabbing'>
                <Card
                    bordered={false}
                    title={listName.toUpperCase()}
                    extra={renderMoreOption}
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
                            > Add a Card
                            </Button>
                        </div>
                    ]}
                >
                    {
                        cards?.map((card) => <CardComponent key={card.id} card={card} list={props} openModal={()=>{}} />)
                    }

                </Card>
            </div>
        </>
    )
}

export default ActiveListComponent