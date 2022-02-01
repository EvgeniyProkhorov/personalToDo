import {FilterType, TodoListType} from "../App";

type TodoActionType = ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC>
    | ReturnType<typeof changeFilterAC>


export const todoListReducer = (state: Array<TodoListType>, action: TodoActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{id: action.payload.ID, title: action.payload.title, filter: "all"}, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(s => s.id !== action.payload)
        case "CHANGE-TITLE-TODOLIST":
            return state.map(s => s.id === action.payload.todoListID ? {...s, title: action.payload.title} : s)
        case "CHANGE-FILTER":
            return state.map(s => s.id === action.payload.todoListID ? {...s, filter: action.payload.filter} : s)
        default:
            return state
    }
}

export const addTodoListAC = (ID: string, title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {ID, title}
    } as const
}

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: todoListID
    } as const
}

export const changeTitleTodoListAC = (todoListID: string, title: string) => {
    return {
        type: "CHANGE-TITLE-TODOLIST",
        payload: {todoListID, title}
    } as const
}

export const changeFilterAC = (todoListID: string, filter: FilterType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            todoListID, filter
        }
    } as const
}