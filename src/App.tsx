import { useState } from 'react';
import './App.css';
import Todolist from './Todolist'

function useState2(initialValue: any) {
  const [data, setData] = useState(initialValue);
  return [data, setData];
}

export type FilterValuesType = "all" | "completed" | "active";

function App() {

  let arr = useState2([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: false },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: true },
  ] );
  let tasks = arr[0];
  let setTasks = arr[1]


  let [filter, setFilter] = useState2("all"); 

  function removeTask (id: number) {
      let filteredTasks = tasks.filter((t: any) => t.id !== id);
       setTasks(filteredTasks);
  } 

  function changeFilter(value:FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if(filter === "completed"){
    tasksForTodoList = tasks.filter((t: any) => t.isDone === true);
  }
  if (filter === "active"){
    tasksForTodoList = tasks.filter((t: any) => t.isDone === false);
  }

  
  return (
    <div className="App">
      <Todolist title="What to learn" 
      tasks={tasksForTodoList}  
      removeTask={removeTask}
      changeFilter={changeFilter}/>
      {/* <Todolist title="Books" tasks={tasks2} />
      <Todolist title="Movies" tasks={tasks3} /> */}

    </div>
  )
}




export default App;



  // let tasks2: Array<TaskType> = [
  //   { id: 1, title: "Atomic Habbit", isDone: true },
  //   { id: 2, title: "Little Prince", isDone: true },
  //   { id: 3, title: "Three friend", isDone: true },
  // ]
  // let tasks3: Array<TaskType> = [
  //   { id: 1, title: "Great Getsbi", isDone: true },
  //   { id: 2, title: "Trancformer", isDone: true },
  //   { id: 3, title: "Cyberpunk 1975", isDone: false },
  // ]