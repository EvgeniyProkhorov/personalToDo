import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListReducer} from "../reducers/todolist-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {appReducer} from "../reducers/app-reducer";


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

export const store = createStore(rootReducer, applyMiddleware(thunk))