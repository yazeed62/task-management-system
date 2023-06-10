import React from "react";

const TaskList = ({ tasks, deleteTask, completeTask, selectTask }) => {
  return (
    <div className="task-list">
      <h2>Task list</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? "completed" : ""}
              onClick={() => selectTask(task)}
            >
              {task.title}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              {!task.completed && (
                <button onClick={() => completeTask(task.id)}>Complete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;