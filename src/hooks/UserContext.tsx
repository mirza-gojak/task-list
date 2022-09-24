import { User } from "models/User";
import { createContext } from "react";

const UserContext = createContext<{
  user?: User;
  setUser: (user?: User) => void;
}>({ setUser: () => undefined });

export default UserContext;
