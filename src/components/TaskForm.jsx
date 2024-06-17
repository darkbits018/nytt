import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";
import { auth } from "../firebase"; // Import Firebase auth
import { addTask, fetchTasks } from "../tasks"; // Import Firestore utility functions

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    status: "todo",
    tags: [],
  });

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  // console.log(taskData.tags)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        console.log("Adding task:", taskData); // Log the task data before adding
        await addTask(currentUser.uid, taskData);
        const updatedTasks = await fetchTasks(currentUser.uid);
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
    setTaskData({
      title: "",
      status: "todo",
      tags: []
    });
  };

  return (
    <div>
      <header className="app_header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={taskData.title}
            className="task_input"
            placeholder="Enter your Task"
            onChange={handleChange}
          />
          <div className="task_form_bottom_line">
            <div>
              <Tag
                tagName="Personal"
                selectTag={selectTag}
                selected={checkTag("Personal")}
              />
              <Tag
                tagName="Work"
                selectTag={selectTag}
                selected={checkTag("Work")}
              />
              <Tag
                tagName="Vacation"
                selectTag={selectTag}
                selected={checkTag("Vacation")}
              />
              <Tag
                tagName="Upskill"
                selectTag={selectTag}
                selected={checkTag("Upskill")}
              />
            </div>
            <div>
              <select
                name="status"
                value={taskData.status}
                className="task_status"
                onChange={handleChange}
              >
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
              <button type="Submit" className="task_submit">
                + Add Task
              </button>
            </div>
          </div>
        </form>
      </header>
    </div>
  );
};

export default TaskForm;
