import {FilterType} from "../../app/App";
import {TodolistType} from "../../api/types";
import {Dispatch} from "redux";
import {todoListApi} from "../../api/todolist-api";
import {RequestStatusType, setErrorAC, setStatusAC} from "./app-reducer";
import {ResultCodes} from "../../enum/enum";

type TodoActionType = ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof getTodosAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
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
    dispatch(setStatusAC("loading"))
    const response = await todoListApi.getTodos()
    dispatch(getTodosAC(response.data))
    dispatch(setStatusAC("succeeded"))

}

export const createTodoTC = (title: string) => async (dispatch: Dispatch<TodoActionType>) => {
    dispatch(setStatusAC("loading"))
    try {
        const response = await todoListApi.createTodolist(title)
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(addTodoListAC(response.data.data.item))
            dispatch(setStatusAC("succeeded"))
        } else {
            dispatch(setErrorAC(response.data.messages.length ? response.data.messages[0] : 'Some Error occurred'))
            dispatch(setStatusAC("failed"))
        }
    } catch {
        dispatch(setStatusAC("failed"))
    }
}

export const deleteTodoTC = (todoListID: string) => async (dispatch: Dispatch<TodoActionType>) => {
    dispatch(changeTodolistEntityStatusAC(todoListID, "loading"))
    dispatch(setStatusAC("loading"))
    try {
        const result = await todoListApi.deleteTodolist(todoListID)
        if (result.data.resultCode === ResultCodes.Success) {
            dispatch(removeTodoListAC(todoListID))
            dispatch(setStatusAC("succeeded"))
            dispatch(changeTodolistEntityStatusAC(todoListID, "idle"))

        } else {
            dispatch(setErrorAC(result.data.messages.length ? result.data.messages[0] : 'Some Error occurred'))
            dispatch(setStatusAC("failed"))
            dispatch(changeTodolistEntityStatusAC(todoListID, "idle"))
        }
    } catch {
        dispatch(changeTodolistEntityStatusAC(todoListID, "idle"))
    }
}

export const updateTodoTitleTC = (todolistID: string, title: string) => async (dispatch: Dispatch<TodoActionType>) => {
    dispatch(setStatusAC("loading"))
    try {
        const response = await todoListApi.updateTodolist(todolistID, title)
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(changeTitleTodoListAC(todolistID, title))
            dispatch(setStatusAC("succeeded"))
        } else {
            dispatch(setErrorAC(response.data.messages.length ? response.data.messages[0] : 'Some Error occurred'))
            dispatch(setStatusAC("failed"))
        }
    } catch {
        dispatch(setStatusAC("failed"))
    }
}