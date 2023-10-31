import React from 'react'
import { Switch } from 'antd'
import { MdOutlineLightMode, MdOutlineModeNight } from 'react-icons/md'

type Props = {
    toggleTheme: () => void,
    theme: string
}

const SwitchThemeComponent = (props: Props) => {
    const { toggleTheme, theme } = props
    return (
        <>
            <Switch
                onClick={toggleTheme}
                checked={theme === "dark" ? true : false}
                checkedChildren={<MdOutlineModeNight className='flex text-center mt-1' />}
                unCheckedChildren={<MdOutlineLightMode className='flex text-center mt-[10px]' />}
                defaultChecked
                size='default'
            />
        </>
    )
}

export default SwitchThemeComponent