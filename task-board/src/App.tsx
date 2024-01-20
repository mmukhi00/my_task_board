import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { myTask } from './model';
import TasksList from './components/TasksList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { v1 as uuidv1, v4 as uuidv4, v3 as uuidv3, v5 as uuidv5 } from 'uuid';
import { resourceLimits } from 'worker_threads';
const App: React.FC = () => {
  const [task, setTask] = useState<string>("")
  const [tasks, setTasks] = useState<myTask[]>([])
  const[completedTasks,setCompletedTasks]=useState<myTask[]>([])
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (task)
    {
      setTasks([...tasks,{id:uuidv1() ,task,isDone:false,priority:1}])  
      setTask("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    console.log("soruce:" + JSON.stringify(source))
    console.log("des:"+ JSON.stringify(destination))
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    let add, active = tasks, complete = completedTasks
    if (source.droppableId === 'TaskList')
    {
     
      add = active[source.index]
      active.splice(source.index, 1)
    }
    else {
      add = complete[source.index]
      complete.splice(source.index,1)
    }

    if (destination.droppableId === 'TaskList') {
      active.splice(destination.index,0,add)// not remove
    }
    else {
      complete.splice(destination.index,0,add)
    }

    setCompletedTasks(complete)
    setTasks(active)
  }
  return (
     <DragDropContext onDragEnd={onDragEnd}>
    <div className='body'>
      <h1 className='title'>My Task Board</h1>
    <InputField task={task} setTask={setTask} handleAddTask={handleAddTask} />
      <TasksList tasks={tasks} setTasks={setTasks} completedTasks={completedTasks} setCompletedTasks={ setCompletedTasks} />
      </div>
      </DragDropContext>
      )
}

export default App;
