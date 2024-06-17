import React, { useState , useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todo from "./assets/direct-hit.png";
import doinIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import { auth } from "./firebase";  // Import Firebase auth
import { fetchTasks, deleteTask  } from "./tasks";  // Import fetchTasks

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleDelete = async (taskId) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await deleteTask(taskId);
        const updatedTasks = await fetchTasks(currentUser.uid);
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };
  useEffect(() => {
    const fetchUserTasks = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userTasks = await fetchTasks(currentUser.uid);
        setTasks(userTasks);
      }
    };
    fetchUserTasks();
  }, []);

  console.log("tasks", tasks);
  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          title="To Do"
          icon={todo}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setTasks={setTasks} 
        />
        <TaskColumn
          title="Doing"
          icon={doinIcon}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          setTasks={setTasks} 
        />
        <TaskColumn
          title="Done !!"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          setTasks={setTasks} 
        />
      </main>
    </div>
  );
};

export default App;
