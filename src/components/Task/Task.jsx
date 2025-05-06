import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import "./Task.css";
import { useTaskActionContext } from "../../context/TaskActionContext/TaskActionContext";

const Task = ({ task }) => {
  const { handleDeleteTask, handleTaskComplete, handleEditTask } =
    useTaskActionContext();
  return (
    <div className="task-item">
      <div>
        <input
          type="checkbox"
          name="completed"
          checked={task.isCompleted}
          onChange={(e) => handleTaskComplete(e, task.id)}
        />
        <span
          className={`${task.isCompleted ? "task-completed" : null} ${
            task.isEditing ? "edit" : null
          }`}
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
};
export default Task;
