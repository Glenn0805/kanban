import { Card, Badge } from 'antd'
import { FiEdit2 } from 'react-icons/fi'
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { CardType, List } from 'src/shared/type/KanbanType';
import { ToggleAddEditModal } from '../type/BoardType';

type Props = {
    openModal:ToggleAddEditModal
    card: CardType,
    list: Omit<List, "cards" | "color">
}

const CardComponent = (props: Props) => {
    const { card,openModal,list} = props
    const {listId,listName}=list
    const {cardName, id,cardLevel } =card
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

    const badgeInfo:any = {
        high: {
            color:"volcano",
            text : "High Priority"
        },
        low:  {
            color:"lime",
            text : "Low Priority"
        },
        medium: {
            color:"gold",
            text : "Medium Priority"
        }
    }

    const openEditModal = () =>{
        openModal({actionType:"edit",listName,listId,card})
    }
    return (
        <>
            <div  ref={setNodeRef} style={style} {...listeners} {...attributes}>
                    <Badge.Ribbon color={badgeInfo[cardLevel].color} text={badgeInfo[cardLevel].text} placement='start' className='abs text-[12px] max-h-[16px] flex justify-center text-center items-center'>
                        <Card className='group/card relative' extra={<div className="text-sm flex gap-2">
                            <FiEdit2 data-no-dnd="true" onClick={openEditModal} className="text-[#1677ff] invisible group-hover/card:visible hover:scale-105 transition ease-in-out delay-75" />
                        </div>}
                            hoverable
                            headStyle={{ minHeight: "0px", paddingTop: "10px", paddingRight: "10px", borderBottom: 0 }}
                            bodyStyle={{ padding: "12px", paddingLeft: "24px", paddingBottom: "24px" }}>
                            <div className="flex items-end justify-between w-full">
                                {cardName}
                            </div>
                        </Card>
                    </Badge.Ribbon>
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