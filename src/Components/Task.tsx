import React, {ChangeEvent} from "react";
import {Button, Checkbox} from "@mui/material";
import {TaskStatuses} from "../api/types";
import {EditableSpan} from "./EditableSpan";

type TaskProps = {
    taskTitle: string;
    taskStatus: TaskStatuses;
    taskID: string
    onClickChangeStatus: (e: ChangeEvent<HTMLInputElement>) => void
    onClickRemoveTask: () => void
    changeTaskTitle: (taskID: string, title: string) => void

}

export const Task = (props: TaskProps) => {
    return (
        <div className={`${props.taskStatus === TaskStatuses.Completed ? "is-done" : ""}`}>
            <Checkbox size={"small"}
                      color={"success"}
                      checked={props.taskStatus === TaskStatuses.Completed}
                      onChange={props.onClickChangeStatus}/>
            <EditableSpan title={props.taskTitle}
                          changeTitle={(title) => props.changeTaskTitle(props.taskID, title)}/>
            <Button color={"error"}
                    style={{maxWidth: '250px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}}
                    size={"small"}
                    onClick={props.onClickRemoveTask}>X</Button>
        </div>
    )
}