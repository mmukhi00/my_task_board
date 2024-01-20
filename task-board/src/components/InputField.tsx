import React, { useReducer, useRef } from "react";
import "./styles.css";
import { Interface } from "readline";
import { stringify } from "querystring";
interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>
 handleAddTask:(e:React.FormEvent)=>void
}
const InputField = ({ task, setTask,handleAddTask }: Props) => {
  const inputRef=useRef<HTMLInputElement>(null)
  return (
    <form className="input" onSubmit={(e) => {
      handleAddTask(e);
      inputRef.current?.blur()
    }}>
      <input
        ref={inputRef}
        type="input"
        placeholder="what's my task?"
        className="input_box"
        value={task}
        onChange={(e)=>setTask(e.target.value)}
      ></input>
      <button className="input_submit" type="submit">
        Create
      </button>
    </form>
  );
};

export default InputField;
