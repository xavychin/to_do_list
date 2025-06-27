import "../style/task_item.css";

interface taskitemProps {
  id: number;
  dueDate: string;
  taskName: string;
  onDelete: (noteIndexToDelete: number) => void;
}

function task_item({ id, dueDate, taskName, onDelete }: taskitemProps) {
  return (
    <div key={id} className="task-item">
      <span className="task-name">{taskName}</span>
      <span className="task-date">{dueDate}</span>
      <button className="delete-btn" onClick={() => onDelete(id)}>
        -
      </button>
    </div>
  );
}

export default task_item;
