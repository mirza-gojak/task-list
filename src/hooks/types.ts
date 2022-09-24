import { Project } from "models/Project";
import { Task } from "models/Task";
import { User } from "models/User";

export interface ApplicationData extends ApplicationActions {
  users: User[];
  tasks: Task[];
  projects: Project[];
}

export interface ApplicationActions {
  addProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  editProject: (projectId: string, data: Partial<Project>) => void;
  addUser: (user: User) => void;
  getUserById: (userId: string) => User | undefined;
  addTask: (task: Task) => void;
  getProjectById: (projectId: string) => Project | undefined;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, data: Partial<Task>) => void;
  getTasksByProjectId: (projectId: string) => Task[];
}
