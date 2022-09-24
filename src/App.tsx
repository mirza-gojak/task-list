import "antd/dist/antd.css";
import DataContext from "hooks/DataContext";
import useLocalStorage from "hooks/useLocalStorage";
import useProjects from "hooks/useProjects";
import UserContext from "hooks/UserContext";
import useTasks from "hooks/useTasks";
import useUsers from "hooks/useUsers";
import { User } from "models/User";
import CalendarPage from "pages/CalendarPage";
import LoginPage from "pages/LoginPage";
import ProjectPage from "pages/ProjectPage";
import TaskPage from "pages/TaskPage";
import TeamPage from "pages/TeamPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import intialData from "utils/intialData";

function App() {
  const projectHandler = useProjects(intialData.projects);
  const userHandler = useUsers(intialData.users);
  const taskHandler = useTasks(intialData.tasks);
  const [user, setUser] = useLocalStorage<User | undefined>("user");

  return (
    <DataContext.Provider
      value={{ ...projectHandler, ...userHandler, ...taskHandler }}
    >
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path="/home" element={<TaskPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
