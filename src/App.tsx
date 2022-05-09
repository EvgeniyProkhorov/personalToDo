import React, {useEffect} from 'react';
import './App.css';
import TodoList from "./Components/TodoList";
import {AddItem} from "./Components/InputForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    changeFilterAC,
    changeTitleTodoListAC, createTodoTC, deleteTodoTC,
    getTodosThunk,
    TodoGeneralType, updateTodoTitleTC,
} from "./Redux/reducers/todolist-reducer";
import {changeTaskAC, createTaskTC, deleteTaskTC, isDoneChangerAC} from "./Redux/reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Redux/store/store";
import {TaskStatuses, TaskType} from "./api/types";

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
    const todoLists = useSelector<AppRootState, Array<TodoGeneralType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)

    useEffect(() => {
        dispatch(getTodosThunk)
    }, [dispatch])

    const addTask = (todoListID: string, title: string) => {
        dispatch(createTaskTC(todoListID, title))
    }
    const removeTask = (todoListID: string, taskID: string) => {
        dispatch(deleteTaskTC(todoListID, taskID))
    }
    const changeTask = (todoListID: string, taskID: string, title: string) => {
        dispatch(changeTaskAC(todoListID, taskID, title))
    }
    const isDoneChanger = (todoListID: string, taskID: string, taskStatus: TaskStatuses) => {
        dispatch(isDoneChangerAC(todoListID, taskID, taskStatus))
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
            <div>
                <Container fixed>
                    <Grid container style={{padding: "20px"}}>
                        <AddItem addItem={addTodoList}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todoLists.map(tl => {
                            let filteredTasks = tasks[tl.id]
                            if (tl.filter === "active") {
                                filteredTasks = tasks[tl.id].filter(t => t.status !== TaskStatuses.New)
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
                                              changeTask={changeTask}
                                              isDoneChanger={isDoneChanger}
                                              removeTodoList={removeTodoList}
                                              changeTitleTodoList={changeTitleTodoList}

                                    />
                                </Paper>
                            </Grid>
                        })}
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default App;