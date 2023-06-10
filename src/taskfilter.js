import React from "react";

const TaskFilter = ({ filterTasks }) => {
  return (
    <div className="task-filter">
      <h2>Filter Tasks</h2>
      <button onClick={() => filterTasks("all")}>All</button>
       <button onClick={() => filterTasks("completed")}>Completed</button>
      <button onClick={() => filterTasks("pending")}>Pending</button>
    </div>
  );
};

export default TaskFilter;