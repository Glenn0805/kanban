import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    closestCorners,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { ConfigProvider, Layout, theme } from 'antd'
import { useState } from 'react'
import CardComponent from '../board/components/CardComponent'
import ListComponent from '../board/components/ListComponent'
import FooterComponent from './component/FooterComponent'
import HeaderComponent from './component/HeaderComponent'
import SideBarComponent from './component/SideBarComponent'
import { toggleSideBar, toggleTheme } from './layout-action'
import useLayoutStore from './layout-store'

type CardType = {
    id?: string,
    cardName?: string
}

const LayoutContainer = () => {
    const { Content } = Layout
    const layoutState = useLayoutStore()

    const { isSideBarOpen, themeColor, dispatch } = layoutState
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
                cardName: "Card 1",
            },
            {
                id: 2,
                cardName: "Card 2",
            }, {
                id: 3,
                cardName: "Card 3",
            }
            , {
                id: 4,
                cardName: "Card 4",
            }, {
                id: 5,
                cardName: "Card 5",
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
        const newIndexId: any = overContainer || activeContainer

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
            const cards = item[key]
            const find = cards.filter((card: CardType) => card.id == id)
            if (find.length > 0) {
                containerId = key
                return containerId
            }
        })
        return containerId
    }
    const { defaultAlgorithm, darkAlgorithm } = theme
    const appTheme = themeColor === "dark" ? darkAlgorithm : defaultAlgorithm

    const toggleSideBarHandler = ()=>{
        dispatch(toggleSideBar(isSideBarOpen))
    }
    const toggleThemeHandler =()=>{
        dispatch(toggleTheme(themeColor))
    }
    return (
        <>
            <ConfigProvider
                theme={{
                    algorithm: appTheme
                }}>
                <Layout>
                    <HeaderComponent toggleSideBar={toggleSideBarHandler} toggleTheme={toggleThemeHandler} theme={themeColor}/>
                    <SideBarComponent isOpen={isSideBarOpen} toggleSideBar={toggleSideBarHandler} />
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
            </ConfigProvider>
        </>
    )
}

export default LayoutContainer