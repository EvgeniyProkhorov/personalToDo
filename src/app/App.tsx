import React, {useEffect} from 'react';
import './App.css';
import TodoList from "../Components/TodoList/TodoList";
import {AddItem} from "../Components/InputForm/InputForm";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/icons-material/Menu";
import {
    changeFilterAC, createTodoTC, deleteTodoTC, getTodosTC,
    TodoGeneralType, updateTodoTitleTC,
} from "../Redux/reducers/todolist-reducer";
import {
    createTaskTC,
    deleteTaskTC,
    updateTaskTC
} from "../Redux/reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../Redux/store/store";
import {TaskStatuses, TaskType} from "../api/types";
import {RequestStatusType} from "../Redux/reducers/app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";

export type FilterType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}


function App() {
    const dispatch = useDispatch()
    const todoLists = useAppSelector<Array<TodoGeneralType>>(state => state.todoLists)
    const tasks = useAppSelector<TasksType>(state => state.tasks)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    useEffect(() => {
        dispatch(getTodosTC())
    }, [dispatch])

    const addTask = (todoListID: string, title: string) => {
        dispatch(createTaskTC(todoListID, title))
    }
    const removeTask = (todoListID: string, taskID: string) => {
        dispatch(deleteTaskTC(todoListID, taskID))
    }
    const changeTaskTitle = (todoListID: string, task: TaskType, title: string) => {
        dispatch(updateTaskTC(todoListID, task, {title}))
    }
    const isDoneChanger = (todoListID: string, task: TaskType, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoListID, task, {status}))
    }

    const addTodoList = (title: string) => {
        dispatch(createTodoTC(title))
    }
    const removeTodoList = (todoListID: string) => {
        dispatch(deleteTodoTC(todoListID))
    }
    const changeTitleTodoList = (todoListID: string, title: string) => {
        dispatch(updateTodoTitleTC(todoListID, title))
    }
    const changeFilter = (todoListID: string, filter: FilterType) => {
        dispatch(changeFilterAC(todoListID, filter))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {'Todo List'}
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItem addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let filteredTasks = tasks[tl.id]
                        if (tl.filter === "active") {
                            filteredTasks = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                        }
                        if (tl.filter === "completed") {
                            filteredTasks = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <TodoList key={tl.id}
                                          todoListId={tl.id}
                                          title={tl.title}
                                          filter={tl.filter}
                                          tasks={filteredTasks}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskTitle={changeTaskTitle}
                                          isDoneChanger={isDoneChanger}
                                          removeTodoList={removeTodoList}
                                          changeTitleTodoList={changeTitleTodoList}
                                />
                            </Paper>
                            <ErrorSnackbar/>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;