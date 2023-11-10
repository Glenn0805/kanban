import { StoreApi, UseBoundStore } from 'zustand'
import { shallow } from 'zustand/shallow'

const useShallowHook = (useStore: UseBoundStore<StoreApi<NonNullable<unknown>>>) => {
    return useStore(
        (state: any) => ({ ...state }), shallow)
}

export default useShallowHook