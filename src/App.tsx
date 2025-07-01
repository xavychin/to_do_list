import { useState } from "react";
import "./style/App.css";
import AddTask from "./components/add_task";
import TaskItem from "./components/task_item";
import "./style/App.css";

function App() {
  const [tasks, setTasks] = useState<
    {
      id: number;
      dueDate: string;
      taskName: string;
      checked: boolean;
    }[]
  >([]);

  const handleAddTask = (newTask: {
    id: number;
    dueDate: string;
    taskName: string;
    checked: boolean;
  }) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = (idToDelete: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== idToDelete));
  };

  const groupedTasks = tasks.reduce((groups, task) => {
    const date = task.dueDate || "";
    if (!groups[date]) {
      groups[date] = [[], []];
    }
    const checkedIndex = task.checked ? 1 : 0;
    groups[date][checkedIndex].push(task);
    return groups;
  }, {} as Record<string, [typeof tasks, typeof tasks]>);

  const handleEdit = (
    idToEdit: number,
    newDueDate: string,
    newTaskName: string
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== idToEdit) return task;

        const updates: Partial<typeof task> = {};
        if (newDueDate !== "") updates.dueDate = newDueDate;
        if (newTaskName !== "") updates.taskName = newTaskName;

        return { ...task, ...updates };
      })
    );
  };

  const handleCheck = (idToEdit: number, checkStatus: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === idToEdit ? { ...task, checked: checkStatus } : task
      )
    );
  };

  return (
    <>
      <AddTask onAddTask={handleAddTask}></AddTask>
      {Object.keys(groupedTasks)
        .sort((a, b) => {
          if (a === "") return -1;
          if (b === "") return 1;
          return new Date(a).getTime() - new Date(b).getTime();
        })
        .map((dueDate) => (
          <div key={dueDate + Date.now()} className="task-item-group-container">
            {dueDate !== "" ? (
              <h2 className="date_header">
                <u>{dueDate}</u>
              </h2>
            ) : null}

            {groupedTasks[dueDate][0].map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                dueDate={task.dueDate}
                taskName={task.taskName}
                checked={task.checked}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onCheck={handleCheck}
              />
            ))}

            {groupedTasks[dueDate][1].length > 0 && (
              <h3 className="complete-header">Completed</h3>
            )}
            {groupedTasks[dueDate][1].map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                dueDate={task.dueDate}
                taskName={task.taskName}
                checked={task.checked}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onCheck={handleCheck}
              />
            ))}
          </div>
        ))}
    </>
  );
}

export default App;
