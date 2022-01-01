import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import {FilterType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (value: string) => void
    isDoneChanger: (id: string, isDone: boolean) => void

}

function ToDo(props: ToDoPropsType) {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setValue(e.currentTarget.value)
    }
    const onClickAddTask = () => {
        if (value.trim() !== '') {
            props.addTask(value.trim())
            setValue('')
        } else {
            setError("Title is required!")
        }
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (value.trim() !== '') {
                props.addTask(value.trim())
                setValue('')
            } else {
                setError("Title is required!")
            }
        }
    }

    const onClickChangeFilterAll = () => props.changeFilter("all")
    const onClickChangeFilterActive = () => props.changeFilter("active")
    const onClickChangeFilterCompleted = () => props.changeFilter("completed")

    const classNameForFilterAll = props.filter === "all" ? "active-filter" : ""
    const classNameForFilterActive = props.filter === "active" ? "active-filter" : ""
    const classNameForFilterCompleted = props.filter === "completed" ? "active-filter" : ""

    return (
        <div>
            <h3>
                {props.title}
            </h3>
            <div>
                <input className={error ? "error" : ""}
                       value={value}
                       onChange={onChangeValueHandler}
                       onKeyPress={onKeyPressAddTask}/>
                <button onClick={onClickAddTask}>+</button>
                <div className={"error-message"}>{error}</div>
            </div>
            {props.tasks.map(t => {
                const onClickRemoveTask = () => props.removeTask(t.id)
                const onClickChangeChecked = (e: MouseEvent<HTMLInputElement>) => {
                    props.isDoneChanger(t.id, e.currentTarget.checked)
                }

                return (
                    <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={t.isDone} onClick={onClickChangeChecked}/>
                        <span>{t.title}</span>
                        <button onClick={onClickRemoveTask}>x</button>
                    </li>
                )
            })}
            <div>
                <button className={classNameForFilterAll}
                        onClick={onClickChangeFilterAll}>All
                </button>
                <button className={classNameForFilterActive}
                        onClick={onClickChangeFilterActive}>Active
                </button>
                <button className={classNameForFilterCompleted}
                        onClick={onClickChangeFilterCompleted}>Completed
                </button>
            </div>
        </div>
    )
}

export default ToDo;