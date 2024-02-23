import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = React.useState(null);
  const apiUrl = "http://localhost:3000";

  React.useEffect(() => {
    async function getEvents() {
      try {
        const response = await fetch(`${apiUrl}/api/event/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
        if (data.events) {
          data.events.forEach((event, index) => {
            if (event.eventDate) {
              event.eventDate = new Date(event.eventDate).toLocaleDateString();
            }

            if (event.photos.length > 0) {
              let fotos = event.photos.map((photo, index) => {
                return photo.replace("public", apiUrl).replaceAll("\\", "/");
              });
              event.photos = fotos;
            }
          });
        }
        setEvents(data.events);
      } catch (error) {
        console.log("Erro ao resgatar eventos:", error);
      }
    }
    getEvents();
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Veja os últimos eventos</h1>
      <div className={styles.eventsContainer}>
        {events && events.length > 0 ? (
          events.map((event, index) => {
            return (
              <div className={styles.eventContainer} key={index}>
                <div
                  className={styles.eventsImg}
                  style={{ backgroundImage: `url(${event.photos[0]})` }}
                ></div>
                <Link to={`/event/${event._id}`} className={styles.eventTitle}>
                  {event.title}
                </Link>
                <p className={styles.eventDate}>{event.eventDate}</p>
                <Link
                  to={`/event/${event._id}`}
                  className={styles.eventDetailsBtn}
                >
                  Ver mais
                </Link>
              </div>
            );
          })
        ) : (
          <Link to="/newevent" className={styles.eventDetailsBtn}>
            Cadastrar Evento
          </Link>
        )}
      </div>
      ;
    </div>
  );
};

export default Home;
