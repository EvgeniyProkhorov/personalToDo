import React, {ChangeEvent, useEffect} from "react";
import {FilterType} from "../App";
import {AddItem} from "./InputForm";
import {EditableSpan} from "./EditableSpan";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {useDispatch} from "react-redux";
import {getTasksTC} from "../Redux/reducers/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/types";
import {Task} from "./Task";


type ToDoPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    todoListId: string
    removeTask: (todoListID: string, taskID: string) => void
    changeFilter: (todoListID: string, value: FilterType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskTitle: (todoListID: string, task: TaskType, title: string) => void
    isDoneChanger: (todoListID: string, task: TaskType, taskStatus: TaskStatuses) => void
    removeTodoList: (todoListID: string) => void
    changeTitleTodoList: (todoListID: string, title: string) => void

}

function TodoList(props: ToDoPropsType) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasksTC(props.todoListId))
    }, [dispatch, props.todoListId])

    const removeTodoList = () => props.removeTodoList(props.todoListId)

    const onClickHandlerFilterChanger = (value: FilterType) => {
        props.changeFilter(props.todoListId, value)
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }
    const changeTaskTitle = (task: TaskType, title: string) => {
        props.changeTaskTitle(props.todoListId, task, title)
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
            {props.tasks.map(task => {
                const onClickRemoveTask = () => props.removeTask(props.todoListId, task.id)
                const onClickChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.isDoneChanger(props.todoListId, task, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
                }

                return (
                    <Task key={task.id}
                          task={task}
                          onClickChangeStatus={onClickChangeStatus}
                          onClickRemoveTask={onClickRemoveTask}
                          changeTaskTitle={changeTaskTitle}
                    />
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

export default TodoList;