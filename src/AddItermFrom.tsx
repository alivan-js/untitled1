import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title:string) => void
}

const AddItermFrom = (props:AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()
    const onClickAddItem  = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const inputKeyDownAddTask = error ? 'error' : '';
    const errorMessage = <div style={{color: 'hotpink'}}>Title is required!</div>
    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                className={inputKeyDownAddTask}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && errorMessage}
        </div>
    );
};

export default AddItermFrom;