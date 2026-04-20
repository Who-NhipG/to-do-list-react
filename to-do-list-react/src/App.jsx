import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = tasks.map((item, index) =>
        index === editIndex ? { ...item, text: task } : item
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }

    setTask("");
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "uncompleted") return !item.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <input
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addTask();
          }
        }}
      />

      <button className="submit-btn" onClick={addTask}>
        {editIndex !== null ? "Update Task" : "Submit"}
      </button>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("uncompleted")}>Uncompleted</button>
      </div>

      <p>
        Total tasks: {tasks.length} | Completed:{" "}
        {tasks.filter((item) => item.completed).length}
      </p>

      {filteredTasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {filteredTasks.map((item, index) => (
            <li key={index}>
              <span className={item.completed ? "completed" : ""}>
                {item.text}
              </span>

              <div>
                <button
                  className="complete-btn"
                  onClick={() => {
                    const updatedTasks = tasks.map((taskItem, i) =>
                      i === index
                        ? { ...taskItem, completed: !taskItem.completed }
                        : taskItem
                    );
                    setTasks(updatedTasks);
                  }}
                >
                  {item.completed ? "Undo" : "Complete"}
                </button>

                <button
                  className="editBtn"
                  onClick={() => {
                    setTask(item.text);
                    setEditIndex(index);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => {
                    const newTasks = tasks.filter((_, i) => i !== index);
                    setTasks(newTasks);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;