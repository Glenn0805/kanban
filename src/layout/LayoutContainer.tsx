import { App, ConfigProvider, Layout } from 'antd'
import FooterComponent from './component/FooterComponent'
import HeaderComponent from './component/HeaderComponent'
import SideBarComponent from './component/SideBarComponent'
import { toggleSideBar, toggleTheme } from './layout-action'
import useLayoutStore from './layout-store'
import BoardContainer from '../board/BoardContainer'
import useBoardStore from 'src/board/board-store'
import themeConfig from './themeConfig'
import AddEditBoardModal from 'src/board/components/AddEditBoardModal'
import { addBoard,toggleAddEditBoardModal } from 'src/board/board-action'
import { Board } from 'src/shared/type/KanbanType'
import { ToggleAddEditBoardModal } from 'src/board/type/BoardType'

const LayoutContainer = () => {
    const { Content } = Layout
    const layoutState = useLayoutStore()
    const isSideBarOpen = layoutState.isSideBarOpen
    const themeColor = layoutState.themeColor
    const appTheme = themeConfig[themeColor]

    const boardStore = useBoardStore()
    const data = boardStore.data
    const addEditBoardModal = boardStore.addEditBoardModal
    const activeBoard = boardStore.activeBoard

    const toggleSideBarHandler = () => {
        toggleSideBar(isSideBarOpen)
    }

    const toggleThemeHandler = () => {
        toggleTheme(themeColor)
    }

    const toggleBoardModal: ToggleAddEditBoardModal = ({ actionType, board }) => {
        toggleAddEditBoardModal({
            isAddEditModalOpen: addEditBoardModal.modal.isAddEditModalOpen,
            actionType: actionType
        },
            board)
    }

    const addNewBoard = (newBoard:Board) =>{
        addBoard(newBoard,data)
    }

    return (
        <>
            <ConfigProvider
                theme={{ ...appTheme }}>
                <App notification={{ placement: "topLeft" }}>
                    <Layout >
                        <HeaderComponent 
                            toggleSideBar={toggleSideBarHandler} 
                            toggleTheme={toggleThemeHandler} 
                            toggleAddBoardModal={toggleBoardModal}
                            theme={themeColor} 
                        />
                        <SideBarComponent isOpen={isSideBarOpen} data={data} toggleSideBar={toggleSideBarHandler} />
                        <Content className='flex-col  h-screen'>
                            <BoardContainer boardId={data[1]?.boardId || ""} boardName={data[1]?.boardName || ""} lists={data[1]?.lists || []} />

                        </Content>
                        <FooterComponent />
                    </Layout>
                    <AddEditBoardModal
                        onClose={toggleBoardModal}
                        handleAddBoard={addNewBoard}
                        board={activeBoard}
                        addEditBoardModal={addEditBoardModal.modal}
                    />
                </App>
            </ConfigProvider>
        </>
    )
}

export default LayoutContainer