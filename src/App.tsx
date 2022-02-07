import React from 'react';
import './App.css';
import ToDo, {TaskType} from "./Components/ToDo";
import {AddItem} from "./Components/InputForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListAC,
    changeFilterAC,
    changeTitleTodoListAC,
    removeTodoListAC,
} from "./reducers/todolist-reducer";
import {
    addTaskAC,
    changeTaskAC,
    isDoneChangerAC,
    removeTaskAC,
} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Redux/store";

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
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)

    const addTask = (todoListID: string, title: string) => {
        dispatch(addTaskAC(todoListID, title))
    }
    const removeTask = (todoListID: string, taskID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))
    }
    const changeTask = (todoListID: string, taskID: string, title: string) => {
        dispatch(changeTaskAC(todoListID, taskID, title))
    }
    const isDoneChanger = (todoListID: string, taskID: string, isDone: boolean) => {
        dispatch(isDoneChangerAC(todoListID, taskID, isDone))
    }

    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }
    const removeTodoList = (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }
    const changeTitleTodoList = (todoListID: string, title: string) => {
        dispatch(changeTitleTodoListAC(todoListID, title))
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
                                filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                filteredTasks = tasks[tl.id].filter(t => t.isDone)
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <ToDo key={tl.id}
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
            {/*<AddItem addItem={addTodoList}/>*/}
        </div>
    );
}

export default App;