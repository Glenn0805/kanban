
export interface ActionPayload{
    payload?: NonNullable<unknown>,
    type?:string
}
export type Action= ActionPayload | undefined

export interface DipatchAction {
    dispatch : (action:Action| undefined)=>void
}

export type InitialState =any

export type Reducer = (state:InitialState,action:Action) => NonNullable<unknown>
