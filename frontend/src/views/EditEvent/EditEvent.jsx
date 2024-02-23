import React from "react";
import EventForm from "../../components/EventForm/EventForm";
import styles from "./EditEvent.module.css";

const EditEvent = () => {
  return (
    <div className={styles.editEvent}>
      <h1 className={styles.title}>Edite o seu evento</h1>
      <EventForm edit={true} />
    </div>
  );
};

export default EditEvent;
