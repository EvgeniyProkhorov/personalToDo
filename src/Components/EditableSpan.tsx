import React, {ChangeEvent, useState} from "react";

type EditableSpanProps = {
    title: string
    callback: (title: string) => void
}
export const EditableSpan = (props: EditableSpanProps) => {
    const [value, setValue] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        props.callback(e.currentTarget.value)
    }

    return (
        edit
            ? <input value={value} onChange={onChangeHandler} autoFocus onBlur={() => setEdit(false)}/>
            : <span onDoubleClick={() => setEdit(true)}>{props.title}</span>
    )
}