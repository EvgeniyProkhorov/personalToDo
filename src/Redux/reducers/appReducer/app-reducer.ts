import {NullableType} from "../../../Components/types";
import {Dispatch} from "redux";
import {todoListApi} from "../../../api/TodolistAPI/todolist-api";
import {ResultCodes} from "../../../enum/enum";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {addTodoListAC} from "../todolistReducer/todolist-reducer";
import {authAPI} from "../../../api/AuthAPI/authApi";
import {setIsLoggedIn} from "../authReducer/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as NullableType<string>,
}

type InitialStateType = typeof initialState
type AppActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsLoggedIn>

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

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', payload: status,} as const)

export const setAppErrorAC = (error: NullableType<string>) => ({type: 'APP/SET-ERROR', payload: error} as const)


export const initializedAppTC = () => async (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const response = await authAPI.me()
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (err: any) {
        handleServerNetworkError(dispatch, err.message)
    }
}