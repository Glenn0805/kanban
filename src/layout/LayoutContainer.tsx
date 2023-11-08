import { ConfigProvider, Layout } from 'antd'
import FooterComponent from './component/FooterComponent'
import HeaderComponent from './component/HeaderComponent'
import SideBarComponent from './component/SideBarComponent'
import { toggleSideBar, toggleTheme } from './layout-action'
import useLayoutStore from './layout-store'
import BoardContainer from '../board/BoardContainer'
import useBoardStore from 'src/board/board-store'
import themeConfig from './themeConfig'

const LayoutContainer = () => {
    const { Content } = Layout
    const layoutState = useLayoutStore()

    const { isSideBarOpen, themeColor, dispatch } = layoutState
    // const appTheme = themeColor === "dark" ? darkAlgorithm : defaultAlgorithm
    const appTheme =themeConfig[themeColor]

    const toggleSideBarHandler = ()=>{
        dispatch(toggleSideBar(isSideBarOpen))
    }
    const toggleThemeHandler =()=>{
        dispatch(toggleTheme(themeColor))
    }
    
    const boardStore = useBoardStore()
    const data = boardStore.data

    return (
        <>
            <ConfigProvider
                theme={{...appTheme}}>
                <Layout>
                    <HeaderComponent toggleSideBar={toggleSideBarHandler} toggleTheme={toggleThemeHandler} theme={themeColor}/>
                    <SideBarComponent isOpen={isSideBarOpen} toggleSideBar={toggleSideBarHandler} />
                    <Content className='flex-col  h-screen'>
                        
                            {/* <DndContext
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
                            </DndContext> */}
                            <BoardContainer boardId={data[0]?.boardId || ""} boardName={data[0]?.boardName || ""} lists={data[0]?.lists || []}/>
                        
                    </Content>
                    <FooterComponent />
                </Layout>
            </ConfigProvider>
        </>
    )
}

export default LayoutContainer