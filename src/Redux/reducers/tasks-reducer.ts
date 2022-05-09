import {addTodoListAC, getTodosAC, removeTodoListAC} from "./todolist-reducer";
import {TasksType} from "../../app/App";
import {TaskStatuses, TaskType, UpdateDomainTaskModelType, UpdateTaskModelType} from "../../api/types";
import {Dispatch} from "redux";
import {todoListApi} from "../../api/todolist-api";

type TasksActionType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof isDoneChangerAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof getTodosAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>

const initState: TasksType = {}

export const tasksReducer = (state: TasksType = initState, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "TASKS/SET-TASKS":
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
        case "TASKS/ADD-TASK":
            return {...state, [action.payload.todolistID]: [action.payload.item, ...state[action.payload.todolistID]]}
        case "TASKS/REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(s => s.id !== action.payload.taskID)
            }
        // case "TASKS/CHANGE-TASK-TITLE":
        //     return {
        //         ...state,
        //         [action.payload.todoListID]: state[action.payload.todoListID].map(s => s.id === action.payload.taskID ? {
        //             ...s,
        //             title: action.payload.title
        //         } : s)
        //     }
        // case "TASKS/CHECKBOX-CHANGER":
        //     return {
        //         ...state,
        //         [action.payload.todoListID]: state[action.payload.todoListID].map(s => s.id === action.payload.taskID ? {
        //             ...s,
        //             isDone: action.payload.taskStatus
        //         } : s)
        //     }
        case "TASKS/UPDATE-TASK":
            return {
                ...state, [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(t => t.id === action.payload.taskID ? {...action.payload.task} : t)
            }
        default:
            return state
    }
}


export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
    return {
        type: "TASKS/SET-TASKS",
        payload: {todolistID, tasks}
    } as const
}

export const addTaskAC = (todolistID: string, item: TaskType) => {
    return {
        type: "TASKS/ADD-TASK",
        payload: {
            todolistID,
            item
        }
    } as const
}

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: "TASKS/REMOVE-TASK",
        payload: {todoListID, taskID}
    } as const
}

export const changeTaskAC = (todoListID: string, task: TaskType, title: string) => {
    return {
        type: "TASKS/CHANGE-TASK-TITLE",
        payload: {todoListID, task, title}
    } as const
}

export const isDoneChangerAC = (todoListID: string, taskID: string, taskStatus: TaskStatuses) => {
    return {
        type: "TASKS/CHECKBOX-CHANGER",
        payload: {todoListID, taskID, taskStatus}
    } as const
}

export const updateTaskAC = (todoListID: string, taskID: string, task: TaskType) => {
    return {
        type: "TASKS/UPDATE-TASK",
        payload: {todoListID, taskID, task}
    } as const
}

export const getTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
    const response = await todoListApi.getTasks(todolistId)
    dispatch(setTasksAC(todolistId, response.data.items))
}

export const createTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    const response = await todoListApi.createTask(todolistId, title)
    dispatch(addTaskAC(todolistId, response.data.data.item))
}

export const deleteTaskTC = (todoListID: string, taskID: string) => async (dispatch: Dispatch) => {
    await todoListApi.deleteTask(todoListID, taskID)
    dispatch(removeTaskAC(todoListID, taskID))
}

export const updateTaskTC = (todoListID: string, task: TaskType, updateModel: UpdateDomainTaskModelType) => async (dispatch: Dispatch) => {
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...updateModel
    }
    const response = await todoListApi.updateTask(todoListID, task.id, apiModel)
    dispatch(updateTaskAC(todoListID, task.id, response.data.data.item))
}