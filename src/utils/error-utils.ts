import {setAppErrorAC, setAppStatusAC} from "../Redux/reducers/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/types";


export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC("failed"))
}

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : 'Some Error occurred'))
    dispatch(setAppStatusAC("failed"))
}