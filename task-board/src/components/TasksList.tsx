import React,{useState} from 'react'
import { myTask } from '../model'
import "./styles.css"
import Task from './Task';
import { Droppable } from "react-beautiful-dnd";
import CompletedTask from './CompletedTasks';

interface props{
    tasks: myTask[];
    setTasks: React.Dispatch<React.SetStateAction<myTask[]>>;
    completedTasks:myTask[]
    setCompletedTasks:React.Dispatch<React.SetStateAction<myTask[]>>
    
}

const TasksList = ({ tasks, setTasks,completedTasks,setCompletedTasks }: props) => {
   
    const[periority,setPriority]=useState<0|1>()
    const onDelete = (id: string) => {
      setTasks(tasks.filter((task) => task.id != id))    
    }
    const onDone = (id: string) => {
        setTasks(tasks.map((task) => task.id == id ? { ...task, isDone: !task.isDone }:task))
    }
    const onEdit = (e: React.FormEvent<HTMLFormElement>, id: string, value: string) => {
        e.preventDefault();
        setTasks(tasks.map((task) => task.id == id ? { ...task, task: value } : task))
        
    }
    const setTaskPriority = (id: string,priority:0|1)=>{
        setTasks(tasks.map(task=>task.id==id?{...task,priority}:task))
    }
    const onDeleteCompleteTask = (id: string) => {
      setCompletedTasks(completedTasks.filter((task) => task.id != id))    
    }
  return (
      <div className='tasks'>
          <Droppable droppableId='TaskList'>
              {(provided) => (
                   <div className='uncompleted_task' ref={provided.innerRef} {...provided.droppableProps}>
              <h2 className='task_title'>Uncompleted Task</h2>
              {tasks.map((task,index) => {
                  if (task.priority == 1) {
                      return <Task task={task}
                       index={index}
                          key={task.id}
                          tasks={tasks}
                          setTasks={setTasks}
                          onDelete={onDelete}
                          onDone={onDone}
                          onEdit={onEdit}
                          setTaskPriority={setTaskPriority}
                      />
                  }
               
              })}

              {tasks.length>1 && <>
              <h3 className='less_prior'>Less Prior</h3>
        <hr
            className='divider'
        ></hr></>}
              {tasks.map((task,index) => {
                  if (task.priority == 0) {
                      return <Task task={task}
                       index={index}
                          key={task.id}
                          tasks={tasks}
                          setTasks={setTasks}
                          onDelete={onDelete}
                          onDone={onDone}
                          onEdit={onEdit}
                          setTaskPriority={setTaskPriority}
                      />
                  }
               
              })}
                      {provided.placeholder}
          </div>
              )}
             
          </Droppable>
          <Droppable droppableId='completed_task' >
              {(provided) => (
                <div className='completed_task' ref={provided.innerRef} {...provided.droppableProps}>
              <h2 className='task_title'>Completed Task</h2>
               {completedTasks.map((task,index)=>(
                   <CompletedTask task={task}
                  index={index}
                  key={task.id}
                  tasks={tasks}
                  onDeleteCompleteTask={onDeleteCompleteTask}
              />
               ))}
            {provided.placeholder}
          </div>
              )}
          </Droppable>       
   </div>
  )
}

export default TasksList