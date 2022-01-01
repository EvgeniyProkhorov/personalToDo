import React, {useState} from 'react';
import './App.css';
import ToDo, {TaskType} from "./Components/ToDo";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"

function App() {

    const toDoTitle: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "React", isDone: true},
    ])
    const [filter, setFilter] = useState<FilterType>("all")
    console.log(tasks)

    function changeFilter(trigger: FilterType) {
        setFilter(trigger)
    }

    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const addTask = (value: string) => {
        const newTask = {id: v1(), title: value, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const isDoneChanger = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone} : t))
    }

    return (
        <div className="App">
            <ToDo title={toDoTitle}
                  tasks={filteredTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  isDoneChanger={isDoneChanger}
                  filter={filter}
            />
        </div>
    );
}

export default App;