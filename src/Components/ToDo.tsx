import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilteredType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type ToDoPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilteredType
    removeTask: (id: string) => void
    changeFilter: (value: FilteredType) => void
    addTask: (value: string) => void
    checkboxSwitcher: (id: string, isDone: boolean) => void

}

function ToDo(props: ToDoPropsType) {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const trimmedValue = value.trim()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (trimmedValue) {
                props.addTask(trimmedValue)
                setValue('')
            } else {
                setError(true)
            }
        }
    }
    const onClickAddTask = () => {
        if (trimmedValue) {
            props.addTask(trimmedValue)
            setValue('')
        } else {
            setError(true)
        }
    }


    const onClickFilterAll = () => props.changeFilter("all")
    const onClickFilterActive = () => props.changeFilter("active")
    const onClickFilterCompleted = () => props.changeFilter("completed")

    return (
        <div>
            <h3>
                {props.title}
            </h3>

            <div>
                <input className={error ? "error" : ''}
                       value={value}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickAddTask}>+</button>
                {error ? <div className={'errorMessage'}>This field is required!</div> : ''}
            </div>

            {props.tasks.map(t => {
                const onClickRemoveHandler = () => props.removeTask(t.id)
                return (
                    <li key={t.id} className={t.isDone ? "" : "is-done"}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(e) => props.checkboxSwitcher(t.id, e.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickRemoveHandler}>x</button>
                    </li>
                )
            })}

            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onClickFilterAll}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onClickFilterActive}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onClickFilterCompleted}>Completed
                </button>
            </div>
        </div>
    )
}

export default ToDo;