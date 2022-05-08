import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListReducer} from "../reducers/todolist-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))