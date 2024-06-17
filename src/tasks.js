// src/tasks.js
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const tasksCollection = collection(db, "tasks");

export const addTask = (uid, task) => {
  return addDoc(tasksCollection, {
    uid,
    title: task.title,
    tags: task.tags,
    status: task.status,
    timestamp: new Date(),
  });
};

export const deleteTask = (taskId) => {
  const taskDoc = doc(db, "tasks", taskId);
  return deleteDoc(taskDoc);
};
export const fetchTasks = async (uid) => {
  const q = query(tasksCollection, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push({ ...doc.data(), id: doc.id });
  });
  console.log("Fetched tasks:", tasks); // Log the fetched tasks
  return tasks;
};
