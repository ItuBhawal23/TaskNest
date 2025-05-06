import TaskInput from "../components/TaskInput/TaskInput";
import TaskList from "../components/TaskList/TaskList";
import { TaskActionsProvider } from "../context/TaskActionContext/TaskActionContext";
import "./TaskNest.css";

const TaskNest = () => {
  return (
    <div className="task-nest-container">
      <h1>Task Nest</h1>
      <TaskActionsProvider>
        <TaskInput />
        <TaskList />
      </TaskActionsProvider>
    </div>
  );
};
export default TaskNest;
