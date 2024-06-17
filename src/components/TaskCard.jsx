import React from "react";
import "./TaskCard.css";
import Tag from "./Tag";
import delIcon from "../assets/delete.png";
import { deleteTask, fetchTasks } from "../tasks";
import { auth } from "../firebase";

const TaskCard = ({ title, tags, handleDelete, index, taskId, setTasks  }) => {
  const handleDeleteTask = async () => {
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
  return (
    <article className="task_card">
      <p className="task_text">{title}</p>

      <div className="task_card_bottom_line">
        <div className="task_card_tags">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected={true} />
          ))}
        </div>
        <div className="task_delete" onClick={() => handleDelete(index)}>
          <img className="delete_icon" src={delIcon} alt="" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
