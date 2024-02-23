/* eslint-disable react/prop-types */
import React from "react";
import styles from "./DataTable.module.css";
import Message from "../Message/Message";
import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext";

const DataTable = ({ eventsData }) => {
  const [message, setMessage] = React.useState();
  const [success, setSuccess] = React.useState(false);

  const global = React.useContext(UserContext);

  const apiUrl = "http://localhost:3000";

  async function removeEvent(eventId) {
    const userId = global.id;
    const token = global.token;

    const data = {
      id: eventId,
      userId: userId,
    };

    const jsonData = JSON.stringify(data);

    try {
      const response = await fetch(`${apiUrl}/api/event`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: jsonData,
      });

      const data = await response.json();

      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage(data.msg);
        setSuccess(true);
      }

      setTimeout(() => {
        setMessage(null);

        //pegar todas as festas novamente
        global.getEvents();
      }, 1000);
    } catch (error) {
      console.log("Erro ao excluir festa:", error);
    }
  }

  return (
    <div className={styles.dataContainer}>
      {message && <Message message={message} success={success} />}
      <div className={styles.dataTableHeading}>
        <div className={styles.dataIdHeading}>Num</div>
        <div className={styles.dataTitleHeading}>Nome do Evento:</div>
        <div className={styles.dataActionsHeading}>Ações:</div>
      </div>
      <div className={styles.dataTableBody}>
        {eventsData.map((event, index) => {
          return (
            <div key={index} className={styles.dataRow}>
              <div style={styles.dataIdContainer}>{index + 1}</div>
              <div style={styles.dataTitleContainer}>
                <Link to={`/event/${event._id}`} className={styles.link}>
                  {event.title}
                </Link>
              </div>
              <div className={styles.dataActionsContainer}>
                <Link to={`/editevent/${event._id}`} className={styles.editBtn}>
                  Editar
                </Link>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeEvent(event._id)}
                >
                  Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataTable;
