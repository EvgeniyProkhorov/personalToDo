import {instance} from "../instance";
import {LoginParamsType, ResponseType} from "../types";
import {AxiosResponse} from "axios";


export const loginAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data)
    }
}