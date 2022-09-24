import { Project } from "models/Project";

export interface ProjectModalProps {
  onCancel: () => void;
  project?: Project;
}
