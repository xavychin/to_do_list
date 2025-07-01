import { useRef, useState } from "react";
import "../style/task_item.css";

interface taskitemProps {
  id: number;
  dueDate: string;
  taskName: string;
  checked: boolean;
  onDelete: (indexToDelete: number) => void;
  onEdit: (
    indexToEdit: number,
    newDueDate: string,
    newTaskName: string
  ) => void;
  onCheck: (indextoCheck: number, checkStatus: boolean) => void;
}

function task_item({
  id,
  dueDate,
  taskName,
  checked,
  onDelete,
  onEdit,
  onCheck,
}: taskitemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTaskName, setEditTaskName] = useState<string>(taskName);
  const [editDueDate, setEditDueDate] = useState<string>(dueDate);
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const editRef = useRef<HTMLDivElement>(null);

  const handleEditBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      onEdit(id, editDueDate, editTaskName);
      setIsEditing(false);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked((prev) => !prev);
    onCheck(id, e.target.checked);
  };

  return (
    <div key={id} className="task-item">
      {isEditing ? (
        <div
          ref={editRef}
          tabIndex={-1}
          onBlur={handleEditBlur}
          className="input-container"
        >
          <input
            onChange={(e) => setEditTaskName(e.target.value)}
            className="task-name"
            type="text"
            value={editTaskName}
            name="task-name"
          ></input>
          <input
            onChange={(e) => setEditDueDate(e.target.value)}
            className="task-date"
            type="date"
            value={editDueDate}
            name="task-date"
          ></input>
        </div>
      ) : (
        <div className="input-container">
          <span className="task-name">{taskName}</span>
          <span className="task-date">{dueDate}</span>
        </div>
      )}
      <input
        name="task-checkbox"
        className="task-checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheck}
      ></input>
      <svg
        onClick={() => setIsEditing((prev) => !prev)}
        xmlns="http://www.w3.org/2000/svg"
        className="edit-btn bi bi-pencil-square"
        viewBox="0 0 16 16"
        tabIndex={0}
        role="button"
        aria-label="Edit task"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsEditing((prev) => !prev);
        }}
      >
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path
          fillRule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
        />
      </svg>
      <svg
        onClick={() => onDelete(id)}
        xmlns="http://www.w3.org/2000/svg"
        className="delete-btn bi bi-trash3-fill"
        viewBox="0 0 16 16"
        tabIndex={0}
        role="button"
        aria-label="Delete task"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onDelete(id);
        }}
      >
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
      </svg>
    </div>
  );
}

export default task_item;
