import React, {ChangeEvent} from "react";
import {FilterType} from "../App";
import {AddItem} from "./InputForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox, IconButton} from "@mui/material";

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
    changeTask: (todoListID: string, id: string, title: string) => void
    isDoneChanger: (todoListID: string, id: string, isDone: boolean) => void
    removeTodoList: (todoListID: string) => void
    changeTitleTodoList: (todoListID: string, title: string) => void

}

function ToDo(props: ToDoPropsType) {

    const removeTodoList = () => props.removeTodoList(props.todoListId)

    const onClickHandlerFilterChanger = (value: FilterType) => {
        props.changeFilter(props.todoListId, value)
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }
    const changeTaskTitle = (taskID: string, title: string) => {
        props.changeTask(props.todoListId, taskID, title)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTitleTodoList(props.todoListId, title)
    }

    const classNameForFilterAll = props.filter === "all" ? "contained" : "outlined"
    const classNameForFilterActive = props.filter === "active" ? "contained" : "outlined"
    const classNameForFilterCompleted = props.filter === "completed" ? "contained" : "outlined"

    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    changeTitle={(title) => changeTodoListTitle(title)}/>
                <IconButton
                    size={"small"}
                    onClick={removeTodoList}><Delete/></IconButton>
            </h3>
            <AddItem addItem={addTask}/>
            {props.tasks.map(t => {
                const onClickRemoveTask = () => props.removeTask(props.todoListId, t.id)
                const onClickChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                    props.isDoneChanger(props.todoListId, t.id, e.currentTarget.checked)
                }

                return (
                    <li key={t.id}
                        className={`li ${t.isDone ? "is-done" : ""}`}>
                        {/*<input type="checkbox" checked={t.isDone} onClick={onClickChangeChecked}/>*/}
                        <Checkbox size={"small"}
                                  color={"success"}
                                  checked={t.isDone}
                                  onChange={onClickChangeChecked}/>
                        <EditableSpan title={t.title}
                                      changeTitle={(title) => changeTaskTitle(t.id, title)}/>
                        <Button color={"error"}
                                style={{maxWidth: '250px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}}
                                size={"small"}
                                onClick={onClickRemoveTask}>X</Button>
                    </li>
                )
            })}
            <div>
                <Button size={"small"}
                        variant={classNameForFilterAll}
                        onClick={() => onClickHandlerFilterChanger("all")}>All
                </Button>
                <Button size={"small"}
                        variant={classNameForFilterActive}
                        onClick={() => onClickHandlerFilterChanger("active")}>Active
                </Button>
                <Button size={"small"}
                        color={"success"}
                        variant={classNameForFilterCompleted}
                        onClick={() => onClickHandlerFilterChanger("completed")}>Completed
                </Button>
            </div>
        </div>
    )
}

export default ToDo;