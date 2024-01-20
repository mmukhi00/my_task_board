import { AiFillDelete } from "react-icons/ai";
import { myTask } from "../model";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type props = {
  index:number
  task: myTask;
  tasks: myTask[];
  onDeleteCompleteTask: (id: string) => void;
};


const CompletedTask = ({index, task, onDeleteCompleteTask}: props) => {
  const highPriorTask = `task_single  completedtask_single_bg`
  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <form className={highPriorTask} onSubmit={(e) => {
        }}
          {...provided.draggableProps}{...provided.dragHandleProps} ref={provided.innerRef}>      
        <s className="task_single--text">{task.task}</s>
      <div>
        <span className="icon" onClick={() => onDeleteCompleteTask(task.id)}>
          <AiFillDelete />
              </span>     
      </div>
    </form>
      )}
    
    </Draggable>
  );
};

export default CompletedTask;
