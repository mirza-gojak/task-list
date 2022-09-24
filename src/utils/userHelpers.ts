import { User } from "models/User";

export const getFullName = (user?: User): string =>
  user ? `${user.firstName} ${user.lastName}` : "";

export const getInitials = (user: User): string =>
  `${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`;
