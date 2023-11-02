import { Card } from 'antd'
import { FiEdit2 } from 'react-icons/fi'
import { CardType } from 'src/shared/type/KanbanType'

const ActiveCardComponent = (props:CardType) => {
    return (
        <>
            <Card className='group/card relative rotate-6 cursor-grabbing opacity-75' extra={<div className="text-sm flex gap-2">
                <FiEdit2 className="text-[#1677ff] invisible group-hover/card:visible hover:scale-105 transition ease-in-out delay-75" />
            </div>}
                headStyle={{ minHeight: "0px", paddingTop: "10px", paddingRight: "10px", borderBottom: 0 }}
                bodyStyle={{ padding: "12px", paddingLeft: "24px", paddingBottom: "24px" }}>
                <div className="flex items-end justify-between w-full">
                   {props.cardName}
                </div>
            </Card>
        </>
    )
}

export default ActiveCardComponent