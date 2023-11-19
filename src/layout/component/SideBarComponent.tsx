import { Drawer } from 'antd'
import BoardComponent from '../../board/components/BoardComponent'
import { Board } from 'src/shared/type/KanbanType'

type Props ={
    isOpen:boolean,
    toggleSideBar: ()=>void,
    data:Board[]
}
const SideBarComponent = (props:Props) => {
    const {isOpen,toggleSideBar,data} = props
    return (
        <>
            <Drawer
                title="Boards"
                placement='left'
                closable
                open={isOpen}
                onClose={toggleSideBar}
            >
                {
                    data.map((board)=>
                    <BoardComponent boardName={board.boardName} key={ board.boardId}/>
                    )
                }

            </Drawer>
        </>
    )
}

export default SideBarComponent