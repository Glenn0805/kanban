import { StoreApi, UseBoundStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useShallowHook = (store:UseBoundStore<StoreApi<NonNullable<unknown>>>)=>{
    return store(useShallow((state:any)=> state))
}

export default useShallowHook