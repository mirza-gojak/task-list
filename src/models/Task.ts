import { User } from "models/User";

export enum Priority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
}

export enum Status {
  InProgress = "IN_PROGRESS",
  Completed = "COMPLERED",
  Expired = "EXPIRED",
}

export interface Task {
  id: string;
  title: string;
  dueDate: Date;
  status: Status;
  priority: Priority;
  content?: string;
  assigneeId?: string;
  projectId?: string;
}
