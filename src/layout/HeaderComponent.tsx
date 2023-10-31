import { Button, Layout } from 'antd'
import { BsKanban } from 'react-icons/bs'
import { IoCreateOutline } from 'react-icons/io5'
import SwitchThemeComponent from '../components/SwitchThemeComponent'

type Props = {
    toggleSideBar:()=>void,
    toggleTheme:()=>void,
    theme: string
}

const HeaderComponent = (props:Props) => {
    const { Header } = Layout
    const {toggleSideBar,toggleTheme,theme} = props

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
                    <Button icon={<IoCreateOutline />} className='bg-[#1677ff]' type='primary'> Create </Button>
                </div>
                <div>
                    <SwitchThemeComponent theme={theme} toggleTheme={toggleTheme} />
                </div>
            </Header >
        </>
    )
}

export default HeaderComponent