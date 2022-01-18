import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type InputFormProps = {
    addItem: (title: string) => void
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
            <input className={error ? "error" : ""}
                   value={value}
                   onChange={onChangeValueHandler}
                   onKeyPress={onKeyPressAddTask}/>
            <button onClick={onClickAddTask}>+</button>
            <div className={"error-message"}>{error}</div>
        </div>
    )
}