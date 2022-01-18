import React, {ChangeEvent, useState} from "react";

type EditableSpanProps = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = (props: EditableSpanProps) => {
    const [value, setValue] = useState('')
    const [edit, setEdit] = useState(false)

    const activateEditMode = () => {
        setEdit(true)
        setValue(props.title)
    }
    const deactivateEditMode = () => {
        setEdit(false)
        props.changeTitle(value)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        // props.changeTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input value={value} onChange={onChangeHandler} autoFocus onBlur={deactivateEditMode}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}