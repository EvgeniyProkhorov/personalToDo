import React, {ChangeEvent} from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import {TaskStatuses, TaskType} from "../../../api/types";
import {EditableSpan} from "../../EditableSpan/EditableSpan";

type TaskProps = {
    task: TaskType
    onClickChangeStatus: (e: ChangeEvent<HTMLInputElement>) => void
    onClickRemoveTask: () => void
    changeTaskTitle: (task: TaskType, title: string) => void

}

export const Task = (props: TaskProps) => {
    return (
        <div className={`${props.task.status === TaskStatuses.Completed ? "is-done" : ""}`}>
            <Checkbox size={"small"}
                      color={"success"}
                      checked={props.task.status === TaskStatuses.Completed}
                      onChange={props.onClickChangeStatus}/>

            <EditableSpan title={props.task.title}
                          changeTitle={(title) => props.changeTaskTitle(props.task, title)}/>

            <Button color={"error"}
                    style={{maxWidth: '250px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}}
                    size={"small"}
                    onClick={props.onClickRemoveTask}>X</Button>
        </div>
    )
}