import React, {useState} from "react";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({setTasks}) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: []
  });

  const checkTag =(tag) => {
    return taskData.tags.some(item => item === tag)
  }

  const selectTag =(tag) => {
    if(taskData.tags.some(item => item === tag)) {
      const filterTags = taskData.tags.filter(item => item !== tag)
      setTaskData(prev => {
        return{...prev, tags: filterTags}
      })
    } else {
      setTaskData(prev => {
        return{...prev, tags: [...prev.tags, tag]}
      })
    }

  }

  // console.log(taskData.tags)

  const handleChange = (e) => {
    const {name, value} = e.target;

    setTaskData(prev => {
      return {...prev, [name]: value}
    })
  }

  const handleSubmit =(e) => {
    e.preventDefault();
    console.log(taskData)
    setTasks(prev => {
      return [...prev, taskData]
    })
    setTaskData({
      task: "",
      status: "todo",
      tags: []
    })
  }
  // const [task, setTask] = useState("")
  // const [status, setStatus] = useState("todo")
  // const handleTaskChange = e =>{
  //   setTask(e.target.value);
  // }
  // const handleStatusChange = e =>{
  //   setStatus(e.target.value);
  // }
  return (
    <div>
      <header className="app_header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            value={taskData.task}
            className="task_input"
            placeholder="Enter your Task"
            onChange={handleChange}
          />
          <div className="task_form_bottom_line">
            <div>
              <Tag tagName="Personal" selectTag={selectTag} selected={checkTag("Personal")}/>
              <Tag tagName="Work" selectTag={selectTag} selected={checkTag("Work")}/>
              <Tag tagName="Vacation" selectTag={selectTag} selected={checkTag("Vacation")}/>
              <Tag tagName="Upskill" selectTag={selectTag} selected={checkTag("Upskill")}/>
            </div>
            <div>
              <select name="status" value={taskData.status} className="task_status" onChange={handleChange}>
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
