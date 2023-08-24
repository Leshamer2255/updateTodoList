import { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist'
import { v1 } from 'uuid';


export type FilterValuesType = "all" | "completed" | "active";
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}


function App() {

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t: any) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {id: v1(),title: title,isDone: false};
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t: TaskType) => t.id === taskId);
    if (task) {
        task.isDone = isDone
        setTasks({...tasksObj});
    }
  }

  function changeFilter(value: FilterValuesType, todolistId:string) {
      let todolist = todolists.find(tl => tl.id === todolistId)
      if(todolist) {
        todolist.filter = value;
        setTodoLists([...todolists])
      }
  } 
  
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodoLists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "active" },
    { id: todolistId2, title: "What to buy", filter: "completed" },
  ]);

  let removeTodolist = (todolistId: string) => {
    let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
    setTodoLists(filteredTodolists)

    delete tasksObj[todolistId];
    setTasks({...tasksObj})
  }


  let [ tasksObj, setTasks] = useState({
    [todolistId1]: [ { 
      id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: true },],
    [todolistId2]: [ { 
      id: v1(), title: "Tomato", isDone: true },
    { id: v1(), title: "Potato", isDone: false },
    { id: v1(), title: "Milk", isDone: false },
    { id: v1(), title: "Bread", isDone: true },],
  });


  return (
    <div className="App">
      {
        todolists.map((tl) => {
          let tasksForTodoList = tasksObj[tl.id];

          if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter((t: any) => t.isDone === true);
          }
          if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter((t: any) => t.isDone === false);
          }
          return <Todolist key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter} 
            removeTodolist={removeTodolist}/>
        })
      }
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