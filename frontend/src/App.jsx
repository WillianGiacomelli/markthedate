import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Register from "./views/Register/Register";
import Profile from "./views/Profile/Profile";
import Dashboard from "./views/Dashboard/Dashboard";
import { UserStorage, UserContext } from "../UserContext";
import ProtectedRouter from "./helpers/ProtectedRouter";
import Login from "./views/Login/Login";
import NewEvent from "./views/NewEvent/NewEvent";
import Home from "./views/Home/Home";
import EditEvent from "./views/EditEvent/EditEvent";
import Event from "./views/Event/Event";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/entrar" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRouter>
                    <Profile />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRouter>
                    <Dashboard />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/newevent"
                element={
                  <ProtectedRouter>
                    <NewEvent />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/editevent/:id"
                element={
                  <ProtectedRouter>
                    <EditEvent />
                  </ProtectedRouter>
                }
              />
              <Route
                path="/event/:id"
                element={
                  <ProtectedRouter>
                    <Event />
                  </ProtectedRouter>
                }
              />
            </Routes>
          </div>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
