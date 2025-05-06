import { useTaskActionContext } from "../../context/TaskActionContext/TaskActionContext";
import "./TaskInput.css";

const TaskInput = () => {
  const { inputValue, taskNest, handleInput, handleAdd } =
    useTaskActionContext();

  const isEditing = taskNest.some((task) => task.isEditing === true);

  // update button label
  const updateButtonLabel = () => (isEditing ? "Update" : "Add");

  return (
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
        {updateButtonLabel()}
      </button>
    </div>
  );
};
export default TaskInput;
