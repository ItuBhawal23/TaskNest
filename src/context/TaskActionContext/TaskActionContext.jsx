import { createContext, useContext, useState } from "react";

const initialState = {
  inputValue: "",
  taskNest: [],
  handleInput: () => {},
  handleAdd: () => {},
  handleDeleteTask: () => {},
  handleTaskComplete: () => {},
  handleEditTask: () => {},
};

const TaskActionsContext = createContext(initialState);
// OR
// const TaskActionsContext = createContext(); // initial data is optional

export const TaskActionsProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");
  const [taskNest, setTaskNest] = useState([]);

  //handle input
  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  //handle add
  const handleAdd = () => {
    if (!inputValue.trim().length) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: inputValue.trim(),
      isCompleted: false,
      isEditing: false
    };

    const newTaskNest = [...taskNest];

    const editTaskIndex = newTaskNest.findIndex(
      (task) => task.isEditing === true
    );

    if (editTaskIndex !== -1) {
      newTaskNest[editTaskIndex]["title"] = inputValue;
      newTaskNest[editTaskIndex]["isEditing"] = false;
    } else {
      newTaskNest.push(newTask);
    }
    setTaskNest(newTaskNest);
    setInputValue("");
  };

  //handle delete task
  const handleDeleteTask = (taskIdToDelete) => {
    const tempTaskNest = [...taskNest];

    const isEditing = tempTaskNest.some((task) => task.isEditing === true);
    if (isEditing) return;

    const updatedList = tempTaskNest.filter(
      (task) => task.id !== taskIdToDelete
    );
    setTaskNest(updatedList);
  };

  //handle complete tasks
  const handleTaskComplete = (event, taskIdToComplete) => {
    const isChecked = event.target.checked;

    const tempTaskNest = [...taskNest];

    const isEditing = tempTaskNest.some((task) => task.isEditing === true);
    if (isEditing) return;

    const taskIndex = tempTaskNest.findIndex(
      (task) => task.id === taskIdToComplete
    );

    if (taskIndex === -1) return;
    tempTaskNest[taskIndex]["isCompleted"] = isChecked;
    setTaskNest(tempTaskNest);
  };

  //handle Edit task
  const handleEditTask = (taskIdToEdit) => {
    const tempTaskNest = [...taskNest];

    const taskIndex = tempTaskNest.findIndex(
      (task) => task.id === taskIdToEdit
    );
    if (taskIndex === -1) return;

    tempTaskNest[taskIndex]["isEditing"] = true;

    setTaskNest(tempTaskNest);
    setInputValue(tempTaskNest[taskIndex]["title"]);
  };

  // update button label
  // const updateButtonLabel = () => {
  //   const isEditing = taskNest.some((task) => task.isEditing === true);

  //   if (isEditing) return "Update";
  //   else return "Add";
  // };

  return (
    <TaskActionsContext.Provider
      value={{
        inputValue,
        taskNest,
        handleInput,
        handleAdd,
        handleDeleteTask,
        handleTaskComplete,
        handleEditTask,
      }}
    >
      {children}
    </TaskActionsContext.Provider>
  );
};

export const useTaskActionContext = () => useContext(TaskActionsContext);
