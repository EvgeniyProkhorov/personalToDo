import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Add from "@mui/icons-material/Add";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {RequestStatusType} from "../../Redux/reducers/app-reducer";

type InputFormProps = {
    addItem: (title: string) => void
    entityStatus?: RequestStatusType
}
export const AddItem = (props: InputFormProps) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setValue(e.currentTarget.value)
    }
    const onClickAddTask = () => {
        if (value.trim() !== '') {
            props.addItem(value.trim())
            setValue('')
        } else {
            setError("Title is required!")
        }
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (value.trim() !== '') {
                props.addItem(value.trim())
                setValue('')
            } else {
                setError("Title is required!")
            }
        }
    }
    return (
        <div>
            <TextField label={error ? error : "Add Title"}
                       error={!!error}
                       value={value}
                       size={"small"}
                       variant={"outlined"}
                       onChange={onChangeValueHandler}
                       onKeyPress={onKeyPressAddTask}
                       disabled={props.entityStatus === 'loading'}
            />
            <IconButton color={"primary"}
                        size={"small"}
                        onClick={onClickAddTask}
                        disabled={props.entityStatus === 'loading'}
            ><Add/></IconButton>
        </div>
    )
}

// <input className={error ? "error" : ""}
//        value={value}
//        onChange={onChangeValueHandler}
//        onKeyPress={onKeyPressAddTask}/>