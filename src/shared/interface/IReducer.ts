import { State } from '@dnd-kit/core/dist/store';

export interface Action{
    payload: any,
    type?:string
}

export interface DipatchAction {
    dispatch : (action:Action)=>void
}