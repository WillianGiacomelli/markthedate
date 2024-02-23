import React from "react";
import styles from "./Event.module.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../UserContext";

const Event = () => {
  let [event, setEvent] = React.useState();
  const { id } = useParams();
  const { token } = React.useContext(UserContext);

  const apiUrl = "http://localhost:3000";

  React.useEffect(() => {
    async function getParty() {
      try {
        const response = await fetch(`${apiUrl}/api/event/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const data = await response.json();
        let eventLocal;
        eventLocal = data.event;
        eventLocal.eventDate = new Date(
          eventLocal.eventDate
        ).toLocaleDateString();

        if (eventLocal.photos) {
          let fotos = eventLocal.photos.map((photo, index) => {
            return photo.replace("public", apiUrl).replaceAll("\\", "/");
          });
          eventLocal.photos = fotos;
        }

        setEvent(eventLocal);
      } catch (error) {
        console.log("Erro ao resgatar evento:", error);
      }
    }
    getParty();
  }, []);

  return (
    <div className={styles.event}>
      <h1 className={styles.title}>{event && event.title}</h1>
      <div className={styles.eventContainer}>
        {event && event.photos.length > 0 && (
          <div className={styles.eventImages}>
            <div
              className={`${styles.mainImage}`}
              style={{ backgroundImage: `url(${event.photos[0]})` }}
            ></div>
            <div className={styles.eventMiniImages}>
              <div
                className={styles.miniImage}
                style={{ backgroundImage: `url(${event.photos[1]})` }}
              ></div>
              <div
                className={styles.miniImage}
                style={{ backgroundImage: `url(${event.photos[2]})` }}
              ></div>
              <div className={styles.miniImage}></div>
            </div>
          </div>
        )}

        <div className={styles.eventDetails}>
          <p className={styles.bold}>Descrição do evento</p>
          <p className={styles.eventDescription}>
            {event && event.description}
          </p>
          <p className={styles.bold}>Data da festa</p>
          <p className={styles.eventDate}>{event && event.eventDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Event;
