import React, {useReducer} from 'react';
import './App.css';
import ToDo, {TaskType} from "./Components/ToDo";
import {v1} from "uuid";
import {AddItem} from "./Components/InputForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListAC,
    changeFilterAC,
    changeTitleTodoListAC,
    removeTodoListAC,
    todoListReducer
} from "./reducers/todolist-reducer";
import {
    addTaskAC,
    changeTaskAC,
    createTaskAC,
    isDoneChangerAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/tasks-reducer";

export type FilterType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

export const todoListId1 = v1()
export const todoListId2 = v1()


function App() {
    const newID = v1()

    const todoListState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn', filter: "all"},
        {id: todoListId2, title: 'What to buy', filter: "all"}
    ]
    const tasksState: TasksType = {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Angular", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Fruits", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Coffee", isDone: true},
        ]
    }

    const [todoLists, dispatchTodo] = useReducer(todoListReducer, todoListState)
    const [tasks, dispatchTasks] = useReducer(tasksReducer, tasksState)


    const addTask = (todoListID: string, title: string) => {
        dispatchTasks(addTaskAC(todoListID, title))
    }
    const removeTask = (todoListID: string, taskID: string) => {
        dispatchTasks(removeTaskAC(todoListID, taskID))
    }
    const changeTask = (todoListID: string, taskID: string, title: string) => {
        dispatchTasks(changeTaskAC(todoListID, taskID, title))
    }
    const isDoneChanger = (todoListID: string, taskID: string, isDone: boolean) => {
        dispatchTasks(isDoneChangerAC(todoListID, taskID, isDone))
    }

    const addTodoList = (title: string) => {
        dispatchTodo(addTodoListAC(newID, title))
        dispatchTasks(createTaskAC(newID))
    }
    const removeTodoList = (todoListID: string) => {
        dispatchTodo(removeTodoListAC(todoListID))
        delete tasks[todoListID]
    }
    const changeTitleTodoList = (todoListID: string, title: string) => {
        dispatchTodo(changeTitleTodoListAC(todoListID, title))
    }
    const changeFilter = (todoListID: string, filter: FilterType) => {
        dispatchTodo(changeFilterAC(todoListID, filter))
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