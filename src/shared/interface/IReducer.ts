import { State } from '@dnd-kit/core/dist/store';
import { StateStorage } from 'zustand/middleware';

export interface Action{
    payload: NonNullable<unknown>,
    type?:string
}

export interface DipatchAction {
    dispatch : (action:Action)=>void
}