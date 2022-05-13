import {useDispatch} from "react-redux";
import {useAppSelector} from "../../Redux/store/store";
import {
    changeFilterAC,
    createTodoTC,
    deleteTodoTC,
    getTodosTC,
    TodoGeneralType,
    updateTodoTitleTC
} from "../../Redux/reducers/todolistReducer/todolist-reducer";
import {RequestStatusType} from "../../Redux/reducers/appReducer/app-reducer";
import React, {useEffect} from "react";
import {createTaskTC, deleteTaskTC, updateTaskTC} from "../../Redux/reducers/taskReucer/tasks-reducer";
import {TaskStatuses, TaskType} from "../../api/types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItem} from "../InputForm/InputForm";
import Paper from "@mui/material/Paper";
import TodoList from "./Todolist/TodoList";
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";
import {FilterType, TasksType} from "../types";


export const TodolistsList = () => {
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
                                          entityStatus={tl.entityStatus}
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