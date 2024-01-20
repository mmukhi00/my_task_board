import { useState,useRef, useEffect } from "react";
import { myTask } from "../model";
import "./styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { TiArrowDownThick } from "react-icons/ti";
import { TiArrowUpThick } from "react-icons/ti";
import { Draggable } from "react-beautiful-dnd";

type props = {
  index:number
  task: myTask;
  tasks: myTask[];
  setTasks: React.Dispatch<React.SetStateAction<myTask[]>>;
  onDelete: (id: string) => void;
    onDone: (id: string) => void;
    onEdit: (e: React.FormEvent<HTMLFormElement>,id: string, value: string) => void;
    setTaskPriority:(id:string,periority:0|1)=>void
};


const Task = ({index, task, onDone, onDelete,onEdit,setTaskPriority }: props) => {
    const [edit, setEdit] = useState<boolean>(false)

    const [newValue, setNewValue] = useState<string>(task.task)
  const inputRef = useRef<HTMLInputElement>(null)
  const highPriorTask = `task_single  task_single_bg_high`
  const lowPriorTask=`task_single  task_single_bg_low`
    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])
    console.log(task)
  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <form className={task.priority == 1 ? highPriorTask : lowPriorTask} onSubmit={(e) => {
      setEdit(!edit)
      onEdit(e, task.id, newValue)
        }}
          {...provided.draggableProps}{...provided.dragHandleProps} ref={provided.innerRef}>
          {edit ? <input ref={inputRef} value={newValue} onChange={(e) => setNewValue(e.target.value)} className="task_edit_input" />
              : task.isDone ? (
        <s className="task_single--text">{task.task}</s>
      ) : (
        <span className="task_single--text">{task.task}</span>
      )}
    
    
      <div>
        <span className="icon" onClick={()=>setEdit(!edit)}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => onDelete(task.id)}>
          <AiFillDelete />
              </span>
        {task.priority==1?(<span className="icon" onClick={() => setTaskPriority(task.id,0)}>
          <TiArrowDownThick />
        </span>):(<span className="icon" onClick={() => setTaskPriority(task.id,1)}>
          <TiArrowUpThick />
        </span>)}
      </div>
    </form>
      )}
    
    </Draggable>
  );
};

export default Task;
