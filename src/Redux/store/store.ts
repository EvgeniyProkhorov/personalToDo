import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListReducer} from "../reducers/todolistReducer/todolist-reducer";
import {tasksReducer} from "../reducers/taskReucer/tasks-reducer";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {appReducer} from "../reducers/appReducer/app-reducer";


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

export const store = createStore(rootReducer, applyMiddleware(thunk))