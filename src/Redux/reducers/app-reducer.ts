import {NullableType} from "../../Components/types";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as NullableType<string>
}

type InitialStateType = typeof initialState
type AppActionsType = ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', payload: status,} as const)

export const setErrorAC = (error: NullableType<string>) => ({type: 'APP/SET-ERROR', payload: error} as const)