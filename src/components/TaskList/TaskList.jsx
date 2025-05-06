import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = ({
  taskNest,
  handleDeleteTask,
  handleEditTask,
  handleTaskComplete
}) => {
  return (
    <div className="task-list-container">
      {taskNest.map((task, index) => {
        return (
          <Task
            key={index}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            handleTaskComplete={handleTaskComplete}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
