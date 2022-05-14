import {Dispatch} from "redux";
import {setAppStatusAC} from "../appReducer/app-reducer";
import {loginAPI} from "../../../api/LoginAPI/loginApi";
import {LoginParamsType} from "../../../api/types";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

const initState = {
    isLoggedIn: false
}

type InitSTateType = typeof initState
type AuthActionType = ReturnType<typeof setIsLoggedIn>

export const authReducer = (state: InitSTateType = initState, action: AuthActionType) => {
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
        const response = await loginAPI.login(data)
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (err: any) {
        handleServerNetworkError(dispatch, err.message)
    }
}