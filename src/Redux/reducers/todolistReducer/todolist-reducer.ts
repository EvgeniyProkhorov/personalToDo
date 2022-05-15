import {TodolistType} from "../../../api/types";
import {Dispatch} from "redux";
import {todoListApi} from "../../../api/TodolistAPI/todolist-api";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../appReducer/app-reducer";
import {ResultCodes} from "../../../enum/enum";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {FilterType} from "../../../Components/types";

type TodoActionType = ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof getTodosAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>


export type TodoGeneralType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

const initState: Array<TodoGeneralType> = []

export const todoListReducer = (state: Array<TodoGeneralType> = initState, action: TodoActionType): Array<TodoGeneralType> => {
    switch (action.type) {
        case "TODOLIST/GET-TODOS":
            return action.payload.map(t => ({...t, filter: "all", entityStatus: "idle"}))
        case "TODOLIST/ADD-TODOLIST":
            return [{...action.payload, filter: "all", entityStatus: "idle"}, ...state]
        case "TODOLIST/REMOVE-TODOLIST":
            return state.filter(s => s.id !== action.payload)
        case "TODOLIST/CHANGE-TITLE-TODOLIST":
            return state.map(s => s.id === action.payload.todoListID ? {...s, title: action.payload.title} : s)
        case "TODOLIST/CHANGE-FILTER":
            return state.map(s => s.id === action.payload.todoListID ? {...s, filter: action.payload.filter} : s)
        case "TODOLIST/CHANGE-ENTITY-STATUS":
            return state.map(s => s.id === action.payload.todoListID ? {
                ...s,
                entityStatus: action.payload.entityStatus
            } : s)
        default:
            return state
    }
}

export const getTodosAC = (todoLists: TodolistType[]) => {
    return {
        type: "TODOLIST/GET-TODOS",
        payload: todoLists
    } as const
}

export const addTodoListAC = (todolist: TodolistType) => {
    return {
        type: "TODOLIST/ADD-TODOLIST",
        payload: todolist
    } as const
}

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: "TODOLIST/REMOVE-TODOLIST",
        payload: todoListID
    } as const
}

export const changeTitleTodoListAC = (todoListID: string, title: string) => {
    return {
        type: "TODOLIST/CHANGE-TITLE-TODOLIST",
        payload: {todoListID, title}
    } as const
}

export const changeFilterAC = (todoListID: string, filter: FilterType) => {
    return {
        type: "TODOLIST/CHANGE-FILTER",
        payload: {
            todoListID, filter
        }
    } as const
}

export const changeTodolistEntityStatusAC = (todoListID: string, entityStatus: RequestStatusType) => {
    return {
        type: "TODOLIST/CHANGE-ENTITY-STATUS",
        payload: {
            todoListID, entityStatus
        }
    } as const
}

export const getTodosTC = () => async (dispatch: Dispatch<TodoActionType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const response = await todoListApi.getTodos()
        dispatch(getTodosAC(response.data))
        dispatch(setAppStatusAC("succeeded"))
    } catch (err: any) {
        handleServerNetworkError(dispatch, err.message)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const createTodoTC = (title: string) => async (dispatch: Dispatch<TodoActionType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const response = await todoListApi.createTodolist(title)
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(addTodoListAC(response.data.data.item))
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

export const deleteTodoTC = (todoListID: string) => async (dispatch: Dispatch<TodoActionType>) => {
    dispatch(changeTodolistEntityStatusAC(todoListID, "loading"))
    dispatch(setAppStatusAC("loading"))
    try {
        const response = await todoListApi.deleteTodolist(todoListID)
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(removeTodoListAC(todoListID))
            dispatch(setAppStatusAC("succeeded"))
            dispatch(changeTodolistEntityStatusAC(todoListID, "idle"))

        } else {
            handleServerAppError(dispatch, response.data)
            dispatch(changeTodolistEntityStatusAC(todoListID, "idle"))
        }
    } catch (err: any) {
        handleServerNetworkError(dispatch, err.message)
        dispatch(changeTodolistEntityStatusAC(todoListID, "idle"))
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const updateTodoTitleTC = (todolistID: string, title: string) => async (dispatch: Dispatch<TodoActionType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const response = await todoListApi.updateTodolist(todolistID, title)
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(changeTitleTodoListAC(todolistID, title))
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