import React, {ChangeEvent, memo} from 'react';
import {TaskType} from "./TodoList";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";


type TaskPropsType={
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void

}

export const Task = memo( ({
    task,
    removeTask, changeTaskTitle, changeTaskStatus
                     }: TaskPropsType) => {

    console.log('Task')

    const onTitleChangeHandler = (title: string, ) => {
       changeTaskTitle(task.id, title)
    }
    const onClickRemoveTask = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    { changeTaskStatus(task.id, e.currentTarget.checked)}

    return (
        <ListItem
            key={task.id}
            className={task.isDone ? "isDone" : ""}
            style={{padding: "0"}}
        >
            <Checkbox
                style={{color: "hotpink"}}
                onChange={onChangeHandler}
                checked={task.isDone}
            />
            <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
            <IconButton
                color="primary"
                size="small"
                onClick={onClickRemoveTask}
            >
                <HighlightOffIcon/>
            </IconButton>
        </ListItem>
    );
});

export default Task;