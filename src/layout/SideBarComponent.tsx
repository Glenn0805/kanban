import React from 'react'
import { Drawer } from 'antd'
import layoutStore from '../store/LayoutStore'
import BoardComponent from '../components/BoardComponent'

const SideBarComponent = () => {
    const isOpen = layoutStore((state: any) => state.isSideBarOpen)
    const toggleSideBar = layoutStore((action: any) => action.toggleSideBar)
    return (
        <>
            <Drawer
                title="Boards"
                placement='left'
                closable
                open={isOpen}
                onClose={toggleSideBar}
            >

                <BoardComponent borderColor='red' />
                <BoardComponent borderColor='red' />
                <BoardComponent />
                <BoardComponent />
                <BoardComponent borderColor='red' />
                <BoardComponent borderColor='green' />
                <BoardComponent />
                <BoardComponent borderColor='blue' />
                <BoardComponent />
                <BoardComponent />
                <BoardComponent borderColor='red' />
                <BoardComponent />
                <BoardComponent />
                <BoardComponent />
                <BoardComponent />
                <BoardComponent />


            </Drawer>
        </>
    )
}

export default SideBarComponent