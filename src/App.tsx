import { useState } from "react";
import "./style/App.css";
import AddTask from "./components/add_task";
import TaskItem from "./components/task_item";

function App() {
  const [tasks, setTasks] = useState<
    {
      id: number;
      dueDate: string;
      taskName: string;
    }[]
  >([]);

  const handleAddTask = (newTask: {
    id: number;
    dueDate: string;
    taskName: string;
  }) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = (idToDelete: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== idToDelete));
  };

  const groupedTasks = tasks.reduce((groups, task) => {
    const date = task.dueDate || "";
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {} as Record<string, typeof tasks>);

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
          <div key={dueDate}>
            <h3>{dueDate}</h3>
            {groupedTasks[dueDate].map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                dueDate={task.dueDate}
                taskName={task.taskName}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ))}
    </>
  );
}

export default App;
