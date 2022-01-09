import React, {useState} from 'react';
import './App.css';
import ToDo, {TaskType} from "./Components/ToDo";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
type TasksType = {
    [key:string]: Array<TaskType>
}


function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: "all"},
        {id: todoListId2, title: 'What to buy', filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksType>({
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
    })

    const changeFilter = (todoListID: string, filter: FilterType) => {
        setTodoLists(todoLists.map(m => m.id === todoListID ? {...m, filter} : m))
    }
    const removeTask = (todoListID: string, id: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
    }
    const addTask = (todoListID: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    const isDoneChanger = (todoListID: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === id ? {...t, isDone} : t)})
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    return (
        <div className="App">
            {todoLists.map(tl => {

                let filteredTasks = tasks[tl.id]
                if (tl.filter === "active") {
                    filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    filteredTasks = tasks[tl.id].filter(t => t.isDone)
                }

                return (
                    <ToDo key={tl.id}
                          todoListId={tl.id}
                          title={tl.title}
                          filter={tl.filter}
                          tasks={filteredTasks}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          isDoneChanger={isDoneChanger}
                          removeTodoList={removeTodoList}

                    />
                )
            })}
        </div>
    );
}

export default App;