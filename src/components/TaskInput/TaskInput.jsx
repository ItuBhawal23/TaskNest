import './TaskInput.css'

const TaskInput = ({ inputValue, handleInput, handleAdd }) => {
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
        Add
      </button>
    </div>
  );
};
export default TaskInput;
