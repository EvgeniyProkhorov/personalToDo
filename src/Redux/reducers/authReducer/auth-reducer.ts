import {Dispatch} from "redux";
import {setAppStatusAC} from "../appReducer/app-reducer";
import {authAPI} from "../../../api/AuthAPI/authApi";
import {LoginParamsType} from "../../../api/types";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {ResultCodes} from "../../../enum/enum";

const initState = {
    isLoggedIn: false
}

export type AuthInitSTateType = typeof initState
export type AuthActionType = ReturnType<typeof setIsLoggedIn>

export const authReducer = (state: AuthInitSTateType = initState, action: AuthActionType) => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.payload}
        default:
            return state
    }
}

export const setIsLoggedIn = (value: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', payload: value} as const)

export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const response = await authAPI.login(data)
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (err: any) {
        handleServerNetworkError(dispatch, err.message)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const response = await authAPI.logout()
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(setIsLoggedIn(false))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (err: any) {
        handleServerNetworkError(dispatch, err.message)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}