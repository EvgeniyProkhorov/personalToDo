import {instance} from "../instance";
import {AuthType, LoginParamsType, ResponseType} from "../types";
import {AxiosResponse} from "axios";


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data)
    },
    me() {
        return instance.get<ResponseType<AuthType>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    }
}