import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import TaskDetails from "./TaskDetails";
import TaskFilter from "./TaskFilter";
import LoginForm  from "./LoginForm";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);
   const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");


   const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:9292/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:9292/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };


   useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const handleLogin = (enteredUsername, enteredPassword) => {
    if (enteredUsername === "admin" && enteredPassword === "password") {
      setLoggedIn(true);
      setUsername(enteredUsername);
    } else {
      alert("Wrong username or password");
    }
  };


   const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  if (!loggedIn) {
    return <LoginForm handleLogin={handleLogin} />;
  }




  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:9292/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.log(error);
    }
  };

   const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:9292/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
      setSelectedTask(null);
    } catch (error) {
      console.log(error);
    }
  };

   const completeTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:9292/tasks/${id}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });
      const data = await response.json();
      setTasks(
        tasks.map((task) =>
          task.id === data.id ? { ...task, completed: true } : task
        )
      );
      setSelectedTask(null);
    } catch (error) {
      console.log(error);
    }
    };

  const filterTasks = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return false;
  });

  const selectTask = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="app">
      <h1>Task Management System</h1>
      <div className="container">
        <div className="sidebar">
      <TaskForm addTask={addTask} categories={categories} />
      <TaskFilter filterTasks={filterTasks} />
      <button onClick={handleLogout}></button>
      </div>
      <div className="content">
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        completeTask={completeTask}
        selectTask={selectTask}
      />
      {selectedTask && <TaskDetails task={selectedTask} />}
    </div>
    </div>
    </div>
  );
}

export default App;
