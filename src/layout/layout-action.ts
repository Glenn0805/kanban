export const toggleSideBar = (isSideBarOpen: boolean) => {
    return {
        payload: {
            isSideBarOpen: !isSideBarOpen
        }
    }

}

export const toggleTheme = (themeColor: string) => {
    const selectedTheme = themeColor === "light" ? "dark" : "light"
    return { payload: { themeColor: selectedTheme } }
}




