interface taskitemProps {
  id: number;
  dueDate: string;
  taskName: string;
  onDelete: (noteIndexToDelete: number) => void;
}

function task_item({ id, dueDate, taskName, onDelete }: taskitemProps) {
  return (
    <div>
      <span>
        {taskName} | {dueDate}
      </span>
      <button onClick={() => onDelete(id)}>-</button>
    </div>
  );
}

export default task_item;
