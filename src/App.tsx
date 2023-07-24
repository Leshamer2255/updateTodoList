import './App.css';
import Todolist, { TaskType } from './Todolist';

function App() {

  let tasks1: Array<TaskType> = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
  ]
  let tasks2: Array<TaskType> = [
    { id: 1, title: "Atomic Habbit", isDone: true },
    { id: 2, title: "Little Prince", isDone: true },
    { id: 3, title: "Three friend", isDone: true },
  ]
  let tasks3: Array<TaskType> = [
    { id: 1, title: "Great Getsbi", isDone: true },
    { id: 2, title: "Trancformer", isDone: true },
    { id: 3, title: "Cyberpunk 1975", isDone: false },
  ]



  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks1} />
      <Todolist title="Books" tasks={tasks2} />
      <Todolist title="Movies" tasks={tasks3} />

    </div>
  )
}




export default App;
