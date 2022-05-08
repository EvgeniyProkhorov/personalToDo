import {addTodoListAC, getTodosAC, removeTodoListAC} from "./todolist-reducer";
import {TasksType} from "../../App";
import {TaskStatuses, TaskType} from "../../api/types";
import {Dispatch} from "redux";
import {todoListApi} from "../../api/todolist-api";

type TasksActionType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof isDoneChangerAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof getTodosAC>
    | ReturnType<typeof getTasksAC>

const initState: TasksType = {}

export const tasksReducer = (state: TasksType = initState, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "TASKS/GET-TASKS":
            return {...state, [action.payload.todolistID]: action.payload.tasks}
        case "TODOLIST/GET-TODOS":
            let stateCopy = {...state}
            action.payload.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        case "TODOLIST/ADD-TODOLIST":
            return {...state, [action.payload.id]: []}
        case "TODOLIST/REMOVE-TODOLIST":
            const copyState = {...state, [action.payload]: [...state[action.payload]]}
            delete copyState[action.payload]
            return copyState
        // case "ADD-TASK":
        //     let newTask = {id: v1(), title: action.payload.title, isDone: false}
        //     return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
        case "TASKS/REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(s => s.id !== action.payload.taskID)
            }
        case "TASKS/CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(s => s.id === action.payload.taskID ? {
                    ...s,
                    title: action.payload.title
                } : s)
            }
        case "TASKS/CHECKBOX-CHANGER":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(s => s.id === action.payload.taskID ? {
                    ...s,
                    isDone: action.payload.taskStatus
                } : s)
            }
        default:
            return state
    }
}


export const getTasksAC = (todolistID: string, tasks: TaskType[]) => {
    return {
        type: "TASKS/GET-TASKS",
        payload: {todolistID, tasks}
    } as const
}

export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: "TASKS/ADD-TASK",
        payload: {todoListID, title}
    } as const
}

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: "TASKS/REMOVE-TASK",
        payload: {todoListID, taskID}
    } as const
}

export const changeTaskAC = (todoListID: string, taskID: string, title: string) => {
    return {
        type: "TASKS/CHANGE-TASK-TITLE",
        payload: {todoListID, taskID, title}
    } as const
}

export const isDoneChangerAC = (todoListID: string, taskID: string, taskStatus: TaskStatuses) => {
    return {
        type: "TASKS/CHECKBOX-CHANGER",
        payload: {todoListID, taskID, taskStatus}
    } as const
}

export const getTasksTK = (todolistId: string) => (dispatch: Dispatch) => {
    todoListApi.getTasks(todolistId)
        .then(res => dispatch(getTasksAC(todolistId, res.data.items)))
}