import React, { useState } from "react";

const TaskForm = ({ addTask, categories }) => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "" && categoryId !== "") {
      addTask({ title, description, categoryId, completed: false });
      setTitle("");
      setCategoryId("");
      setDescription("");
    }
  };

   return (
    <div className="task-form">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        >
         <option value="">select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;