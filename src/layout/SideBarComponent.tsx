import { Drawer } from 'antd'
import BoardComponent from '../components/BoardComponent'

type Props ={
    isOpen:boolean,
    toggleSideBar: ()=>void
}
const SideBarComponent = (props:Props) => {
    const {isOpen,toggleSideBar} = props
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