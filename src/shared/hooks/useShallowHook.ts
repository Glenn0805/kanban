import { StoreApi, UseBoundStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { shallow } from 'zustand/shallow'

const useShallowHook = (useStore: UseBoundStore<StoreApi<NonNullable<unknown>>>) => {
    return useStore(
        useShallow((state: any) => ({ ...state })))
}

export default useShallowHook