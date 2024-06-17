import React from "react";
import "./TaskColumn.css";
import TaskCard from "./TaskCard";

const TaskColumn = ({ icon, title, tasks, status, handleDelete, setTasks }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);
  return (
    <div>
      <section className="task_column">
        <h2 className="task_column_heading">
          <img className="task_column_icon" src={icon} alt="" /> {title}
        </h2>

        {filteredTasks.map((task, index) => (
        <TaskCard
          key={task.id}  // Use task.id as key for better performance
          title={task.title}  // Use task.title instead of task.task
          tags={task.tags}
          handleDelete={handleDelete}
          index={index}
          taskId={task.id}  // Pass taskId
          setTasks={setTasks}  // Pass setTasks
        />
      ))}
      </section>
    </div>
  );
};

export default TaskColumn;
