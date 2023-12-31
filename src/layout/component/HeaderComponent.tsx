import { Button, Layout } from 'antd'
import { BsKanban } from 'react-icons/bs'
import { IoCreateOutline } from 'react-icons/io5'
import SwitchThemeComponent from './SwitchThemeComponent'
import { ToggleAddEditBoardModal } from 'src/board/type/BoardType'

type Props = {
    toggleSideBar:()=>void,
    toggleTheme:()=>void,
    theme: string,
    toggleAddBoardModal:ToggleAddEditBoardModal
}

const HeaderComponent = (props:Props) => {
    const { Header } = Layout
    const {toggleSideBar,toggleTheme,theme,toggleAddBoardModal} = props

    return (
        <>

            <Header className='items-center justify-between flex bg-slate-400' >
                <div className='flex items-center gap-4 font-semibold text-white cursor-pointer'>
                    <div className='flex  items-center gap-1' onClick={toggleSideBar}>
                        <BsKanban className="text-2xl" />
                        <span className=' text-2xl'>
                            Kanban
                        </span>
                    </div>
                    <Button 
                        onClick={()=>{
                            toggleAddBoardModal({actionType:"add"})
                        }}
                        icon={<IoCreateOutline />} 
                        className='bg-[#1677ff] shadow-none' type='primary'> Create  Board</Button>
                </div>
                <div>
                    <SwitchThemeComponent theme={theme} toggleTheme={toggleTheme} />
                </div>
            </Header >
        </>
    )
}

export default HeaderComponent