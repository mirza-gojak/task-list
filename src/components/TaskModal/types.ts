import { Task } from "models/Task";

export interface TaskModalProps {
  onCancel: () => void;
  task?: Task;
}
