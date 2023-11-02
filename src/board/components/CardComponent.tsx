import { Card, Badge } from 'antd'
import { FiEdit2 } from 'react-icons/fi'
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';

type Props = {
    color?: string,
    title?: string,
    hasLabel?: boolean,
    id: UniqueIdentifier
}
const CardComponent = (props: Props) => {
    const { color = "#1677ff", title, hasLabel = false, id } = props
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

                    <Badge.Ribbon color={color} text="Priority" placement='start' className='text-[8px] max-h-[16px] flex justify-center text-center items-center'>
                        <Card className='group/card ' extra={<div className="text-sm flex gap-2">
                            <FiEdit2 className="text-[#1677ff] invisible group-hover/card:visible hover:scale-105 transition ease-in-out delay-75" />
                        </div>}
                            hoverable
                            headStyle={{ minHeight: "0px", paddingTop: "10px", paddingRight: "10px", borderBottom: 0 }}
                            bodyStyle={{ padding: "12px", paddingLeft: "24px", paddingBottom: "24px" }}>
                            <div className="flex items-end justify-between w-full">
                                {title}
                            </div>
                        </Card>
                    </Badge.Ribbon>
                ) : (
                    <Card className='group/card' extra={<div className="text-sm flex gap-2">
                        <FiEdit2 className="text-[#1677ff] invisible group-hover/card:visible hover:scale-105 transition ease-in-out delay-75" />
                    </div>}
                        hoverable
                        headStyle={{ minHeight: "0px", paddingTop: "10px", paddingRight: "10px", borderBottom: 0 }}
                        bodyStyle={{ padding: "12px", paddingLeft: "24px", paddingBottom: "24px" }}>
                        <div className="flex items-end justify-between w-full">
                            {title}
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