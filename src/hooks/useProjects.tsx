import useLocalStorage from "hooks/useLocalStorage";
import { Project } from "models/Project";

const useProjects = (initialData: Project[]) => {
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "projects",
    initialData
  );

  const addProject = (project: Project): void => {
    setProjects([...projects, project]);
  };

  const deleteProject = (projectId: string): void => {
    setProjects(projects?.filter((project) => project.id !== projectId));
  };

  const editProject = (projectId: string, data: Partial<Project>): void => {
    const items = projects;
    const project = projects?.findIndex((item) => item.id === projectId);
    items[project] = { ...items[project], ...data };

    setProjects(items);
  };

  const getProjectById = (projectId: string): Project | undefined => {
    return projects.find((project) => project.id === projectId);
  };

  return { projects, addProject, deleteProject, editProject, getProjectById };
};

export default useProjects;
