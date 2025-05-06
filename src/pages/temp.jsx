import { useState } from "react";
import "./TaskNest.css";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";

const TaskNest = () => {
  const [inputValue, setInputValue] = useState("");
  const [taskNest, setTaskNest] = useState([]);

  //handle input
  const handleInput = (event) => {
    setInputValue(event.target.value);
    console.log("input", event.target.value);
  };

  //handle add
  const handleAdd = () => {
    const newTask = {
      id: crypto.randomUUID(),
      title: inputValue,
      isCompleted: false,
      isEditing: false
    };

    const newTaskNest = [...taskNest];

    const isEditingTaskIndex = newTaskNest.findIndex(
      (task) => task.isEditing === true
    );

    if (isEditingTaskIndex !== -1) {
      newTaskNest[isEditingTaskIndex]["title"] = inputValue;
    } else {
      newTaskNest.push(newTask);
      setTaskNest(newTaskNest);
    }
    setInputValue("");
  };

  //handle delete task
  const handleDeleteTask = (taskIdToDelete) => {
    const updatedList = taskNest.filter((task) => task.id !== taskIdToDelete);
    setTaskNest(updatedList);
  };

  //handle complete tasks
  const handleTaskComplete = (event, taskIdToComplete) => {
    const isChecked = event.target.checked;

    const tempTaskNest = [...taskNest];

    const taskIndex = tempTaskNest.findIndex(
      (task) => task.id === taskIdToComplete
    );
    tempTaskNest[taskIndex]["isCompleted"] = isChecked;
    setTaskNest(tempTaskNest);
  };

  //handle Edit task
  const handleEditTask = (taskIdToEdit) => {
    console.log("taskIdToEdit", taskIdToEdit);

    const tempTaskNest = [...taskNest];
    console.log("tempTaskNest", tempTaskNest);

    const taskIndex = tempTaskNest.findIndex(
      (task) => task.id === taskIdToEdit
    );
    tempTaskNest[taskIndex]["isEditing"] = true;
    setTaskNest(tempTaskNest);
    setInputValue(tempTaskNest[taskIndex]["title"]);
  };

  return (
    <div className="task-nest-container">
      <h1>Task Nest</h1>
      <div className="input-btn-container">
        <input
          type="text"
          placeholder="Nest your tasks"
          value={inputValue}
          onChange={handleInput}
          onKeyUp={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className={`add-btn ${!inputValue.trim().length ? "disabled" : ""}`}
          disabled={!inputValue.trim().length}
        >
          Add
        </button>
      </div>
      <div className="task-list-container">
        {taskNest.map((task, index) => {
          return (
            <div key={index} className="task-item">
              <div>
                <input
                  type="checkbox"
                  name="completed"
                  onClick={(e) => handleTaskComplete(e, task.id)}
                />
                <span
                  className={`${task.isCompleted ? "task-completed" : null}`}
                >
                  {task.title}
                </span>
              </div>

              <div className="action-items">
                <BsFillTrash3Fill onClick={() => handleDeleteTask(task.id)} />
                <BiSolidPencil onClick={() => handleEditTask(task.id)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TaskNest;
