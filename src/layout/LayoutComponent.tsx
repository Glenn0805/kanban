import { useState } from 'react'
import { Layout, Typography } from 'antd'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import SideBarComponent from './SideBarComponent'
import ListComponent from '../components/ListComponent'
import {
    DndContext, closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    DragOverlay,
    UniqueIdentifier

} from '@dnd-kit/core'
import CardComponent from '../components/CardComponent'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arraySwap, arrayMove } from '@dnd-kit/sortable'


type CardType = {
    id?: string,
    title?: string
}

const LayoutComponent = () => {
    const { Content } = Layout
    const { Text } = Typography

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const [item, setItem] = useState<any>({
        'todo': [
            {
                id: 1,
                title: "Card 1",
            },
            {
                id: 2,
                title: "Card 2",
            }, {
                id: 3,
                title: "Card 3",
            }
            , {
                id: 4,
                title: "Card 4",
            }, {
                id: 5,
                title: "Card 5",
            }
        ],
        'ongoing': [],
        'checking': [],
        'done': []
    }
    )

    const [activeCard, setActiveCard] = useState<CardType>();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const overId = over?.id;
        const activeId = active.id

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }
        let newIndexId: any = overContainer || activeContainer

        const oldIndex = active.data.current?.sortable.index
        const newIndex = over?.data.current?.sortable.index
        const newArr = arrayMove(item[newIndexId], oldIndex, newIndex);
        if (active.id !== over?.id) {
            setItem({ ...item, [newIndexId]: newArr });
        }

        setActiveCard({})
    }

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const { data, id } = active;
        const current = data.current
        const currentItem = item[current?.sortable.containerId]
        const currentItemIndex = currentItem.findIndex((item: CardType) => item.id == id)
        setActiveCard(currentItem[currentItemIndex]);
    }

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over, } = event;
        const overId = over?.id;
        const activeId = active.id
        const activeContainer: any = findContainer(activeId);
        const overContainer: any = findContainer(overId);
        if (!overContainer || !activeContainer || activeContainer === overContainer) {
            return;
        }
        setItem((prev: any) => {
            const activeItems = prev[activeContainer]
            const overItems = prev[overContainer]

            const activeItemIndex: number = prev[activeContainer].findIndex((data: CardType) => data.id == activeId)
            const overItemIndex: number = prev[overContainer].findIndex((data: CardType) => data.id == overId)

            let newIndex: number;
            if (overContainer in prev) {
                newIndex = overItems.length + 1
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;

                newIndex =
                    overItemIndex >= 0 ? overItemIndex + modifier : overItems.length + 1;
            }
            return {
                ...prev,
                [activeContainer]: prev[activeContainer].filter(
                    (item: CardType) => item.id !== activeId
                ),
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    prev[activeContainer][activeItemIndex],
                    ...prev[overContainer].slice(
                        newIndex,
                        prev[overContainer].length
                    ),
                ],
            };
        })
    }

    function findContainer(id: UniqueIdentifier | undefined) {
        if (!id) return
        if (id in item) {
            return id;
        }
        const listKey = Object.keys(item)
        let containerId = ""
        listKey.forEach((key) => {
            let cards = item[key]
            let find = cards.filter((card: CardType) => card.id == id)
            if (find.length > 0) {
                containerId = key
                return containerId
            }
        })
        return containerId
    }

    return (
        <>
            <Layout>
                <HeaderComponent />
                <SideBarComponent />
                <Content className='flex-col  h-screen'>
                    <div className='p-10 flex gap-9'>
                        <DndContext
                            onDragEnd={handleDragEnd}
                            onDragStart={handleDragStart}
                            sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragOver={handleDragOver}>
                            <ListComponent title='TO DO' listId='todo' items={item.todo} />
                            <ListComponent title='On Going' listId='ongoing' items={item.ongoing} />
                            <ListComponent title='Checking' listId='checking' items={item.checking} />
                            <ListComponent title='Done' listId='done' items={item.done} />
                            <DragOverlay>{activeCard?.id ? <CardComponent id={activeCard.id} title={activeCard.title} /> : null}</DragOverlay>
                        </DndContext>
                    </div>
                </Content>
                <FooterComponent />
            </Layout>
        </>
    )
}

export default LayoutComponent