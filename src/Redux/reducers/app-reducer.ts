export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType
}

type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setStatusAC>

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", payload: status,} as const)