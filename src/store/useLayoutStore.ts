import useShallowHook from "../shared/hooks/useShallowHook";
import layoutStore from "./LayoutStore";
type State = {
    themeColor:string,
    isSideBarOpen:boolean,
    toggleTheme:()=>void,
    toggleSideBar:()=>void
}

const useLayoutStore =():State=> useShallowHook(layoutStore)
export default useLayoutStore