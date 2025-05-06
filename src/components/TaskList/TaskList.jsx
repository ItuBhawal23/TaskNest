import { useTaskActionContext } from "../../context/TaskActionContext/TaskActionContext";
import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = () => {
  const { taskNest } = useTaskActionContext();
  const getTaskList = () => {
    return taskNest.map((task, index) => <Task key={index} task={task} />);
  };
  return <div className="task-list-container">{getTaskList()}</div>;
};

export default TaskList;
