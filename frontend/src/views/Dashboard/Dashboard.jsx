import React from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import DataTable from "../../components/DataTable/DataTable";

const Dashboard = () => {
  const { getEvents, events } = React.useContext(UserContext);

  React.useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Gerencie seus eventos</h1>
        <Link to="/newevent" className={styles.btn}>
          Cadastrar Evento
        </Link>
      </div>
      {events && events.length >= 1 ? (
        <DataTable eventsData={events} />
      ) : (
        <Link to="/newevent" className={styles.link}>
          Clique aqui para criar um novo evento
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
