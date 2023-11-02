import { Card, Badge } from 'antd'
import { FiEdit2 } from 'react-icons/fi'
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { CardType } from 'src/shared/type/KanbanType';

const CardComponent = (props: CardType) => {
    const { labelColor = "#1677ff", cardName, hasLabel = false, id } = props
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <>
            <div ref={setNodeRef} style={style} {...listeners} {...attributes}>{
                hasLabel ? (

                    <Badge.Ribbon color={labelColor} text="Priority" placement='start' className='abs text-[8px] max-h-[16px] flex justify-center text-center items-center'>
                        <Card className='group/card relative ' extra={<div className="text-sm flex gap-2">
                            <FiEdit2 className="text-[#1677ff] invisible group-hover/card:visible hover:scale-105 transition ease-in-out delay-75" />
                        </div>}
                            hoverable
                            headStyle={{ minHeight: "0px", paddingTop: "10px", paddingRight: "10px", borderBottom: 0 }}
                            bodyStyle={{ padding: "12px", paddingLeft: "24px", paddingBottom: "24px" }}>
                            <div className="flex items-end justify-between w-full">
                                {cardName}
                            </div>
                        </Card>
                    </Badge.Ribbon>
                ) : (
                    <Card className='group/card relative' extra={<div className="text-sm flex gap-2">
                        <FiEdit2 className="text-[#1677ff] invisible group-hover/card:visible hover:scale-105 transition ease-in-out delay-75" />
                    </div>}
                        hoverable
                        headStyle={{ minHeight: "0px", paddingTop: "10px", paddingRight: "10px", borderBottom: 0 }}
                        bodyStyle={{ padding: "12px", paddingLeft: "24px", paddingBottom: "24px" }}>
                        <div className="flex items-end justify-between w-full">
                            {cardName}
                        </div>
                    </Card>
                )
            }
            </div>
        </>
        // <>
        //     <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        //         ASDSA
        //     </button>
        // </>
    )
}

export default CardComponent