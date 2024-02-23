import React from "react";
import Message from "../Message/Message";
import styles from "./EventForm.module.css";
import InputSubmit from "../InputSubmit/InputSubmit";
import { UserContext } from "../../../UserContext";
import { useNavigate, useParams } from "react-router-dom";

const EventForm = ({ edit }) => {
  let [userId, setUserId] = React.useState();
  let [message, setMessage] = React.useState();
  let [success, setSuccess] = React.useState(false);
  let [title, setTitle] = React.useState(null);
  let [description, setDescription] = React.useState(null);
  let [eventDate, setEventDate] = React.useState("");
  let [photos, setPhotos] = React.useState([]);
  let [showMiniImages, setShowMiniImages] = React.useState(true);
  let [privacy, setPrivacy] = React.useState(false);
  let [created, setCreated] = React.useState(false);

  const navigate = useNavigate();

  let global = React.useContext(UserContext);

  const apiUrl = "http://localhost:3000";

  const { id } = useParams();

  React.useEffect(() => {
    if (created) {
      navigate("/dashboard");
    }
  }, [created]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!edit) {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("event_date", eventDate);
      formData.append("privacy", privacy);

      if (photos.length > 0) {
        let photosArray = Array.from(photos); //converte a estrutra filelist para um array
        photosArray.map((photo) => {
          formData.append("photos", photo);
        });
      }

      //pegar token do contexto ou do local Storage
      let token = window.localStorage.getItem("token");

      try {
        const response = await fetch(`${apiUrl}/api/event`, {
          method: "POST",
          headers: {
            "auth-token": token,
          },
          body: formData,
        });

        const data = await response.json();

        if (data.error) {
          setMessage(data.error);
          setSuccess(false);
        } else {
          setMessage(data.msg);
          setSuccess(true);

          setTimeout(() => {
            setMessage(false);

            setCreated(true);
          }, 2000);
        }
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
      }
    } else {
      const formData = new FormData();

      formData.append("id", id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("event_date", eventDate);
      formData.append("privacy", privacy);
      formData.append("userId", global.id);

      if (photos.length > 0) {
        let photosArray = Array.from(photos); //converte a estrutra filelist para um array
        photosArray.map((photo) => {
          formData.append("photos", photo);
        });
      }

      //pegar token do contexto ou do local Storage

      try {
        const response = await fetch(`${apiUrl}/api/event`, {
          method: "PUT",
          headers: {
            "auth-token": global.token,
          },
          body: formData,
        });

        const data = await response.json();

        if (data.error) {
          setMessage(data.error);
          setSuccess(false);
        } else {
          setMessage(data.msg);
          setSuccess(true);

          setTimeout(() => {
            setMessage(false);

            setCreated(true);
          }, 2000);
        }
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
      }
    }
  }

  function handlePhotos(e) {
    let photosUploaded = e.target.files;
    setPhotos(photosUploaded);
  }

  return (
    <div>
      {message && <Message message={message} success={success} />}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={styles.eventForm}
      >
        <input type="hidden" id="id" name="id" />
        <div className={styles.inputContainer}>
          <label htmlFor="title" className={styles.label}>
            Nome do Evento:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o nome do evento"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description" className={styles.label}>
            Descrição:
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="O que vai acontecer"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className={styles.input}
          ></textarea>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="event_date" className={styles.label}>
            Data do Evento:
          </label>
          <input
            type="date"
            name="event_date"
            id="event_date"
            value={eventDate}
            onChange={(event) => setEventDate(event.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="photos" className={styles.label}>
            Imagens:
          </label>
          <input
            type="file"
            multiple
            name="photos"
            id="photos"
            onChange={(event) => setPhotos(event.target.files)}
            className={styles.input}
          />
        </div>
        {edit && showMiniImages && (
          <div className={styles.miniImages}>
            <p className={styles.miniImagesText}>Imagens Atuais:</p>
            {photos.map((photo, indice) => (
              <img src={photo} key={indice} />
            ))}
          </div>
        )}
        <div className={styles.checkboxContainer}>
          <label htmlFor="privacy" className={styles.label}>
            Evento privado?
          </label>
          <input
            type="checkbox"
            name="privacy"
            id="privacy"
            checked={privacy}
            onChange={(event) => setPrivacy(event.target.checked)}
            className={styles.inputCheckbox}
          />
        </div>
        {edit ? (
          <InputSubmit value="Editar Evento" />
        ) : (
          <InputSubmit value="Criar Evento" />
        )}
      </form>
    </div>
  );
};

export default EventForm;
