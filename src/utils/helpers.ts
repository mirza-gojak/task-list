import { Priority, Status } from "models/Task";

export const toCaptialCase = (text: string): string =>
  text.slice(0, 1).toUpperCase().concat(text.slice(1).toLowerCase());

export const mapStatusToText = (status: Status): string => {
  switch (status) {
    case Status.InProgress: {
      return "In Progress";
    }
    case Status.Completed: {
      return "Completed";
    }
    case Status.Expired: {
      return "Expired";
    }
    default: {
      return "";
    }
  }
};

export const sortByPriority = (
  priorityA: Priority,
  priorityB: Priority
): number => {
  if (
    (priorityA === Priority.Low && priorityB === Priority.Medium) ||
    priorityB === Priority.High
  ) {
    return -1;
  }
  if (priorityA === Priority.Medium && priorityB === Priority.Low) {
    return 1;
  }
  if (
    (priorityA === Priority.High && priorityB === Priority.Medium) ||
    priorityB === Priority.Medium
  ) {
    return 1;
  }
  return 0;
};
