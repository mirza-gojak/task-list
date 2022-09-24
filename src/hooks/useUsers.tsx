import useLocalStorage from "hooks/useLocalStorage";
import { User } from "models/User";

const useUsers = (initialData: User[]) => {
  const [users, setUsers] = useLocalStorage<User[]>("users", initialData);

  const addUser = (user: User): void => {
    setUsers([...users, user]);
  };

  const deleteUser = (userId: string): void => {
    setUsers(users?.filter((user) => user.id !== userId));
  };

  const editUser = (userId: string, data: Partial<User>): void => {
    const items = users;
    const user = users.findIndex((item) => item.id === userId);
    items[user] = { ...items[user], ...data };

    setUsers(items);
  };

  const getUserById = (userId: string): User | undefined => {
    return users.find((user) => user.id === userId);
  };

  return { users, addUser, deleteUser, editUser, getUserById };
};

export default useUsers;
