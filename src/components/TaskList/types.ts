import { Task } from "models/Task";

export interface TaskListProps {
  search: string;
  onEdit: (task?: Task) => void;
}
