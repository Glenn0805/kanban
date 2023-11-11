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
    const isSideBarOpen =layoutState.isSideBarOpen
    const themeColor=layoutState.themeColor
    const appTheme =themeConfig[themeColor]

    const toggleSideBarHandler = ()=>{
        toggleSideBar(isSideBarOpen)
    }
    const toggleThemeHandler =()=>{
        toggleTheme(themeColor)
    }
    
    const boardStore = useBoardStore()
    const data = boardStore.data

    return (
        <>
            <ConfigProvider
                theme={{...appTheme}}>
                <Layout >
                    <HeaderComponent toggleSideBar={toggleSideBarHandler} toggleTheme={toggleThemeHandler} theme={themeColor}/>
                    <SideBarComponent isOpen={isSideBarOpen} toggleSideBar={toggleSideBarHandler} />
                    <Content className='flex-col  h-screen'>
                            <BoardContainer boardId={data[0]?.boardId || ""} boardName={data[0]?.boardName || ""} lists={data[0]?.lists || []}/>
                        
                    </Content>
                    <FooterComponent />
                </Layout>
            </ConfigProvider>
        </>
    )
}

export default LayoutContainer