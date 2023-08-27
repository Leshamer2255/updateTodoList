import React, { ChangeEvent} from "react"
import { FilterValuesType } from "./App"
import AddItemForm from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId:string) => void
  addTask: (title: string, todolistId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id:string, newTitle: string) => void
  filter: FilterValuesType
}


export function Todolist(props: PropsType) {

  const onAllClickHandler = () => props.changeFilter("all", props.id)
  const onActiveClickHandler = () => props.changeFilter("active", props.id)
  const onCompletedClickHandler = () => props.changeFilter("completed",props.id)
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div>
      <h2> <EditableSpan title={props.title} onChange={changeTodolistTitle}/> 
      <DeleteIcon onClick={removeTodolist}></DeleteIcon></h2>
      <AddItemForm  addItem={addTask} />
      <ul>
        {
          props.tasks.map(t => {
            const onClickHandler = () => props.removeTask(t.id, props.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked, props.id);
            }
            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(t.id, newValue, props.id);
            }
            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type='checkbox'
                onChange={onChangeHandler}
                checked={t.isDone} />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <DeleteIcon onClick={onClickHandler}>X</DeleteIcon>
            </li>
          })
        }
      </ul>
      <div>
        <Button variant={props.filter === 'all' ? "contained" : "text"} onClick={onAllClickHandler}>ALL</Button>
        <Button color="success" variant={props.filter === 'active' ? "contained" : "text"} onClick={onActiveClickHandler}>Active</Button>
        <Button color="secondary"  variant={props.filter === 'completed' ? "contained" : "text"} onClick={onCompletedClickHandler}>Completed</Button>
      </div>
    </div>
  )
}

export default Todolist

