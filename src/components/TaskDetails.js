import React from "react";

const TaskDetails = ({ task }) => {
  return (
    <div className="task-details">
      <h2>Task Details</h2>
      <p>Title: {task.title}</p>
      <p>Completed: {task.completed ? "Yes" : "No"}</p>
    </div>
  );
};

export default TaskDetails;