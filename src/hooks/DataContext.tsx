import { ApplicationData } from "hooks/types";
import { createContext } from "react";

const DataContext = createContext<ApplicationData>({
  projects: [],
  tasks: [],
  users: [],
  addProject: () => undefined,
  deleteProject: () => undefined,
  editProject: () => undefined,
  getUserById: () => undefined,
  addUser: () => undefined,
  addTask: () => undefined,
  getProjectById: () => undefined,
  deleteTask: () => undefined,
  editTask: () => undefined,
  getTasksByProjectId: () => [],
});

export default DataContext;
