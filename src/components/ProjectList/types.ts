import { Project } from "models/Project";
import { SortType, ViewType } from "pages/types";

export interface ProjectItemProps {
  project: Project;
  onEdit: (project?: Project) => void;
}

export interface ProjectListProps {
  viewType: ViewType;
  sortType: SortType;
  onEdit: (project?: Project) => void;
  search: string;
}
