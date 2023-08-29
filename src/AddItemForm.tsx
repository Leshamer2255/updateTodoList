import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { IconButton, TextField } from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';


type AddItemFormPropsType = {
  addItem: (title: string) => void

}
export function AddItemForm(props: AddItemFormPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      props.addItem(newTaskTitle)
      setNewTaskTitle("");
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle)
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }

  }

  return <div>
    <TextField value={newTaskTitle}
      variant="outlined"
      label={"title"}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      error={!!error}
      helperText={error}
    />
    <IconButton onClick={addTask}>
      <ControlPointIcon />
    </IconButton>
  </div>
}


export default AddItemForm


