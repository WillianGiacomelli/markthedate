import React from "react";
import { Navigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [id, setId] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [events, setEvents] = React.useState();
  const [event, setEvent] = React.useState();

  const apiUrl = "http://localhost:3000";

  React.useEffect(() => {
    const tokenLocal = window.localStorage.getItem("token");
    const idLocal = window.localStorage.getItem("id");
    if (tokenLocal) {
      setToken(tokenLocal);
      setId(idLocal);
      setLogin(true);
      <Navigate to="/dashboard" />;
    }
  }, []);

  function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
    setLogin(false);
    setToken(null);
    setId(null);
    setEvent();
    setEvents(null);
    <Navigate to="/home" />;
  }

  async function getUser() {
    const userFetch = await fetch(`${apiUrl}/api/user/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    const data = await userFetch.json();

    setUser(data.user);
    setId(data.user.id);
  }

  async function getEvents() {
    if (!token) {
      const tokenLocal = window.localStorage.getItem("token");
      setToken(tokenLocal);
    }

    try {
      const response = await fetch(`${apiUrl}/api/event/userevents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await response.json();

      setEvents(data.events);
    } catch (error) {
      console.log("Erro ao pegar evento:", error);
    }
  }

  async function getEventById(eventId) {
    try {
      const response = await fetch(`${apiUrl}/api/event/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await response.json();

      let fotos = data.photos;

      fotos.map((photo, index) => {
        return (photo = photo.replace("public", apiUrl));
      });

      const eventObj = {
        event: data.title,
        eventDate: data.evenDate,
        photos: fotos,
      };

      // setEvent(eventObj);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        login,
        setLogin,
        token,
        setToken,
        id,
        setId,
        logout,
        getUser,
        user,
        events,
        getEvents,
        getEventById,
        event,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
