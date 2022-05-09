import {FilterType} from "../../App";
import {TodolistType} from "../../api/types";
import {Dispatch} from "redux";
import {todoListApi} from "../../api/todolist-api";

type TodoActionType = ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof getTodosAC>


export type TodoGeneralType = TodolistType & { filter: FilterType }

const initState: Array<TodoGeneralType> = []

export const todoListReducer = (state: Array<TodoGeneralType> = initState, action: TodoActionType): Array<TodoGeneralType> => {
    switch (action.type) {
        case "TODOLIST/GET-TODOS":
            return action.payload.map(t => ({...t, filter: "all"}))
        case "TODOLIST/ADD-TODOLIST":
            return [{...action.payload, filter: "all"}, ...state]
        case "TODOLIST/REMOVE-TODOLIST":
            return state.filter(s => s.id !== action.payload)
        case "TODOLIST/CHANGE-TITLE-TODOLIST":
            return state.map(s => s.id === action.payload.todoListID ? {...s, title: action.payload.title} : s)
        case "TODOLIST/CHANGE-FILTER":
            return state.map(s => s.id === action.payload.todoListID ? {...s, filter: action.payload.filter} : s)
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

export const getTodosTC = () => async (dispatch: Dispatch) => {
    const response = await todoListApi.getTodos()
    dispatch(getTodosAC(response.data))
}

export const createTodoTC = (title: string) => async (dispatch: Dispatch) => {
    const response = await todoListApi.createTodolist(title)
    dispatch(addTodoListAC(response.data.data.item))
}

export const deleteTodoTC = (todoListID: string) => async (dispatch: Dispatch) => {
    await todoListApi.deleteTodolist(todoListID)
    dispatch(removeTodoListAC(todoListID))
}

export const updateTodoTitleTC = (todolistID: string, title: string) => async (dispatch: Dispatch) => {
    await todoListApi.updateTodolist(todolistID, title)
    dispatch(changeTitleTodoListAC(todolistID, title))
}