export interface ILayoutState{
    themeColor:string,
    isSideBarOpen:boolean
}

export interface ILayoutAction{
    toggleTheme:()=>void,
    toggleSideBar:()=>void
}