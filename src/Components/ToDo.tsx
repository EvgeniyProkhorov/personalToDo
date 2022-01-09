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
    todoListId: string
    removeTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, value: FilterType) => void
    addTask: (todoListID: string, title: string) => void
    isDoneChanger: (todoListID: string, id: string, isDone: boolean) => void
    removeTodoList: (todoListID: string) => void

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
            props.addTask(props.todoListId, value.trim())
            setValue('')
        } else {
            setError("Title is required!")
        }
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (value.trim() !== '') {
                props.addTask(props.todoListId, value.trim())
                setValue('')
            } else {
                setError("Title is required!")
            }
        }
    }
    const removeTodoList = () => props.removeTodoList(props.todoListId)

    const onClickChangeFilterAll = () => props.changeFilter(props.todoListId, "all")
    const onClickChangeFilterActive = () => props.changeFilter(props.todoListId, "active")
    const onClickChangeFilterCompleted = () => props.changeFilter(props.todoListId, "completed")

    const classNameForFilterAll = props.filter === "all" ? "active-filter" : ""
    const classNameForFilterActive = props.filter === "active" ? "active-filter" : ""
    const classNameForFilterCompleted = props.filter === "completed" ? "active-filter" : ""

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>X</button>
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
                const onClickRemoveTask = () => props.removeTask(props.todoListId, t.id)
                const onClickChangeChecked = (e: MouseEvent<HTMLInputElement>) => {
                    props.isDoneChanger(props.todoListId, t.id, e.currentTarget.checked)
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