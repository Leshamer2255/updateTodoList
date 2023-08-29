import { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist'
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValuesType = "all" | "completed" | "active";
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodoLists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "active" },
    { id: todolistId2, title: "What to buy", filter: "completed" },
  ]);
  let [tasksObj, setTasks] = useState({
    [todolistId1]: [{
      id: v1(), title: "HTML&CSS", isDone: true
    },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: true },],
    [todolistId2]: [{
      id: v1(), title: "Tomato", isDone: true
    },
    { id: v1(), title: "Potato", isDone: false },
    { id: v1(), title: "Milk", isDone: false },
    { id: v1(), title: "Bread", isDone: true },],
  });

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t: any) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }
  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t: TaskType) => t.id === taskId);
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj });
    }
  }
  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t: TaskType) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }
  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todolists])
    }
  }
  function removeTodolist(todolistId: string) {
    let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
    setTodoLists(filteredTodolists)

    delete tasksObj[todolistId];
    setTasks({ ...tasksObj })
  }
  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title = newTitle;
      setTodoLists([...todolists])
    }
  }
  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodoLists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={10}>
        {
          todolists.map((tl) => {
            let tasksForTodoList = tasksObj[tl.id];

            if (tl.filter === "completed") {
              tasksForTodoList = tasksForTodoList.filter((t: any) => t.isDone === true);
            }
            if (tl.filter === "active") {
              tasksForTodoList = tasksForTodoList.filter((t: any) => t.isDone === false);
            }
            return <Grid item> 
              <Paper style={{padding: "10px"}}>
              <Todolist key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodoList}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeStatus={changeStatus}
              changeTaskTitle={changeTaskTitle}
              filter={tl.filter}
              removeTodolist={removeTodolist}
              changeTodolistTitle={changeTodolistTitle} />
              </Paper>
              </Grid>
          })
          
        }
        </Grid>
      </Container>
    </div>
  )
}




export default App;
