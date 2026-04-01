import {useState} from "react";
import "./App.css";

function App () {
  const [task, setTask] = useState(""); //setTask is update the input text 
  const [tasks, setTasks] = useState([]); //
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, {text: task, completed: false}]);
    setTask("");
  };
 return (
  <div className="container">
    <h1>To-Do-List</h1>
    <input type="text" 
    value={task}
    onChange={(event) => setTask(event.target.value)}
    onKeyDown={(event) => {
      if(event.key === "Enter") {
        addTask();
      }
    }}
    />
    <button
      onClick={addTask} // setTask in button helps task state to an empty string bc the imput uses value={task}. also the input box becomes empty.
    >Submit</button>

    {tasks.length === 0 ? (
      <p>No tasks yet.</p>
    ): (
      <ul>
        {tasks.map((item, index) => (
          <li key={index}>
            <span className={item.completed ? "completed" : ""}>
              {item.text}
            </span>

            <div>
              <button onClick={() => {
                const updatedTasks = tasks.map((taskItem, i) =>
                  i === index
                    ? {...taskItem, completed: !taskItem.completed}
                    : taskItem
              );
              setTasks(updatedTasks);
              }}>
                Complete
              </button>

              <button
                className="delete-btn"
                onClick={() => {
                  const newTasks = tasks.filter((_, i) => i !== index);
                  setTasks(newTasks);
                }}
              >Delete</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
 );
}

export default App;