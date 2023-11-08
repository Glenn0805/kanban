import {layoutStore} from './layout-store'

export const toggleSideBar = (isSideBarOpen: boolean) => {
    layoutStore.setState((state)=>({
        ...state,
        isSideBarOpen:!isSideBarOpen
    }))

}

export const toggleTheme = (themeColor: string) => {
    const selectedTheme = themeColor === "light" ? "dark" : "light"
    layoutStore.setState(state=>({
        ...state,
        themeColor:selectedTheme
    }))
}




