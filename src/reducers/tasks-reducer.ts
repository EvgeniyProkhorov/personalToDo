import {v1} from "uuid";
import {TasksType} from "../App";

type TasksActionType = ReturnType<typeof createTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof isDoneChangerAC>

// const initState: InitTasksType = {
//     [todoListId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS/TS", isDone: false},
//         {id: v1(), title: "React", isDone: true},
//         {id: v1(), title: "Angular", isDone: false},
//     ],
//     [todoListId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "Fruits", isDone: false},
//         {id: v1(), title: "Bread", isDone: false},
//         {id: v1(), title: "Coffee", isDone: true},
//     ]
// }

export const tasksReducer = (state: TasksType, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "CREATE-TASK":
            return {...state, [action.payload]: []}
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(s => s.id !== action.payload.taskID)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(s => s.id === action.payload.taskID ? {
                    ...s,
                    title: action.payload.title
                } : s)
            }
        case "CHECKBOX-CHANGER":
            return {...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(s=> s.id === action.payload.taskID? {...s,isDone: action.payload.isDone}: s)}
        default:
            return state
    }
}

export const createTaskAC = (ID: string) => {
    return {
        type: "CREATE-TASK",
        payload: ID
    } as const
}
export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {todoListID, title}
    } as const
}

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {todoListID, taskID}
    } as const
}

export const changeTaskAC = (todoListID: string, taskID: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {todoListID, taskID, title}
    } as const
}

export const isDoneChangerAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {
        type: "CHECKBOX-CHANGER",
        payload: {todoListID, taskID, isDone}
    } as const
}