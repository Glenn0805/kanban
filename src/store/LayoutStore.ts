import { create } from "zustand";

type State = {
    themeColor:string,
    isSideBarOpen:boolean,
    toggleTheme:()=>void,
    toggleSideBar:()=>void
}
const layoutStore = create<State>()((set)=>(
    {
        themeColor:localStorage.getItem('theme') || "light",
        isSideBarOpen:false,
        toggleTheme:()=>set((state)=>{
            let selectedTheme = state.themeColor === "light" ? "dark" : "light"
            localStorage.setItem('theme',selectedTheme)
           return {themeColor:selectedTheme}
        }),
        toggleSideBar:()=>set((state:any)=>({isSideBarOpen:!state.isSideBarOpen}))
    }
))

export default layoutStore