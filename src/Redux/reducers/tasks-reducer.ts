import {addTodoListAC, getTodosAC, removeTodoListAC} from "./todolist-reducer";
import {TasksType} from "../../app/App";
import {TaskStatuses, TaskType, UpdateDomainTaskModelType, UpdateTaskModelType} from "../../api/types";
import {Dispatch} from "redux";
import {todoListApi} from "../../api/todolist-api";
import {setErrorAC, setStatusAC} from "./app-reducer";
import {ResultCodes} from "../../enum/enum";

type TasksActionType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof isDoneChangerAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof getTodosAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>

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

export const getTasksTC = (todolistId: string) => async (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setStatusAC("loading"))
    const response = await todoListApi.getTasks(todolistId)
    dispatch(setTasksAC(todolistId, response.data.items))
    dispatch(setStatusAC("succeeded"))
}

export const createTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setStatusAC("loading"))
    try {
        const response = await todoListApi.createTask(todolistId, title)
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(addTaskAC(todolistId, response.data.data.item))
            dispatch(setStatusAC("succeeded"))
        } else {
            dispatch(setErrorAC(response.data.messages.length ? response.data.messages[0] : 'Some Error occurred'))
        }
    } catch (err: any) {
        dispatch(setErrorAC(err.message))
        dispatch(setStatusAC("failed"))
    }
}

export const deleteTaskTC = (todoListID: string, taskID: string) => async (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setStatusAC("loading"))
    await todoListApi.deleteTask(todoListID, taskID)
    dispatch(removeTaskAC(todoListID, taskID))
    dispatch(setStatusAC("succeeded"))
}

export const updateTaskTC = (todoListID: string, task: TaskType, updateModel: UpdateDomainTaskModelType) => async (dispatch: Dispatch<TasksActionType>) => {
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...updateModel
    }
    dispatch(setStatusAC("loading"))
    const response = await todoListApi.updateTask(todoListID, task.id, apiModel)
    dispatch(updateTaskAC(todoListID, task.id, response.data.data.item))
    dispatch(setStatusAC("succeeded"))
}