import React from "react";
import styles from "./NewEvent.module.css";
import EventForm from "../../components/EventForm/EventForm";

const NewEvent = () => {
  return (
    <div className={styles.newevent}>
      <h1 className={styles.h1}>Adicione a sua festa</h1>
      <EventForm />
    </div>
  );
};

export default NewEvent;
