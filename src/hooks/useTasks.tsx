import useLocalStorage from "hooks/useLocalStorage";
import { Task } from "models/Task";

const useTasks = (initialData: Task[]) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", initialData);

  const addTask = (task: Task): void => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId: string): void => {
    setTasks(tasks?.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId: string, data: Partial<Task>): void => {
    const items = tasks;
    const task = tasks?.findIndex((item) => item.id === taskId);
    items[task] = { ...items[task], ...data };

    setTasks([...items]);
  };

  const getTasksByProjectId = (projectId: string): Task[] => {
    return tasks.filter((task) => task.projectId === projectId);
  };

  return { tasks, addTask, deleteTask, editTask, getTasksByProjectId };
};

export default useTasks;
