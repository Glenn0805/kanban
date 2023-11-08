import { Card, Badge } from 'antd'
import { FiEdit2 } from 'react-icons/fi'
import { CardType } from 'src/shared/type/KanbanType'

const ActiveCardComponent = (props: CardType) => {
    const badgeInfo: any = {
        high: {
            color: "volcano",
            text: "High Priority"
        },
        low: {
            color: "lime",
            text: "Low Priority"
        },
        medium: {
            color: "gold",
            text: "Medium Priority"
        }
    }
    return (
        <>
            <div className='rotate-6 cursor-grabbing opacity-75'>
                <Badge.Ribbon color={badgeInfo[props.cardLevel].color} text={badgeInfo[props.cardLevel].text} placement='start' className='abs text-[12px] max-h-[16px] flex justify-center text-center items-center'>
                    <Card className='group/card relative' extra={<div className="text-sm flex gap-2">
                        <FiEdit2 className="text-[#1677ff] invisible group-hover/card:visible hover:scale-105 transition ease-in-out delay-75" />
                    </div>}
                        headStyle={{ minHeight: "0px", paddingTop: "10px", paddingRight: "10px", borderBottom: 0 }}
                        bodyStyle={{ padding: "12px", paddingLeft: "24px", paddingBottom: "24px" }}>
                        <div className="flex items-end justify-between w-full">
                            {props.cardName}
                        </div>
                    </Card>
                </Badge.Ribbon>
            </div>
        </>
    )
}

export default ActiveCardComponent