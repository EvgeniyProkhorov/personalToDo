import {combineReducers, createStore} from "redux";
import {todoListReducer} from "../reducers/todolist-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";



const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)