import React, {useState} from 'react';
import './App.css';
import ToDo, {TaskType} from "./Components/ToDo";

export type FilteredType = "all" | "active" | "completed"

function App() {

    const toDoTitle: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS/TS", isDone: false},
        {id: 3, title: "React", isDone: true},
    ])
    const [filter, setFilter] = useState<FilteredType>("all")
    console.log(tasks)

    function changeFilter(trigger: FilteredType) {
        setFilter(trigger)
    }

    let filteredTasks = tasks
    if (filter === "active"){
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed"){
        filteredTasks = tasks.filter(t => t.isDone)
    }


    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    return (
        <div className="App">
            <ToDo title={toDoTitle}
                  tasks={filteredTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                />
        </div>
    );
}

export default App;