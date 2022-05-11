import {setAppErrorAC, setAppStatusAC} from "../Redux/reducers/app-reducer";
import {Dispatch} from "redux";


export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC("failed"))
}