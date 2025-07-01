import { useState } from "react";
import "../style/add_task.css";

interface addtaskProps {
  onAddTask: (newTask: {
    id: number;
    dueDate: string;
    taskName: string;
    checked: boolean;
  }) => void;
}

function add_task({ onAddTask }: addtaskProps) {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask({ id: Date.now(), dueDate, taskName, checked: false });
    }
    setTaskName("");
    setDueDate("");
  };

  return (
    <div className="form-container">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          className="input-task"
          type="text"
          name="task_input"
          placeholder="Add a task"
          onChange={handleTaskName}
          value={taskName}
        ></input>
        <input
          name="task_date"
          className="input-date"
          type="date"
          onChange={handleDueDate}
          value={dueDate}
        ></input>
        <button className="add-button" type="submit">
          +
        </button>
      </form>
    </div>
  );
}

export default add_task;
