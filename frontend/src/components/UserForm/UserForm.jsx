import React from "react";
import { Navigate } from "react-router-dom";
import styles from "./UserForm.module.css";
import InputSubmit from "../InputSubmit/InputSubmit";
import Message from "../Message/Message";
import { UserContext } from "../../../UserContext";

const UserForm = ({ edit, dataUser }) => {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  let [message, setMessage] = React.useState();
  let [success, setSuccess] = React.useState(false);
  let [authenticate, setAuthenticate] = React.useState(false);

  const global = React.useContext(UserContext);

  const apiUrl = "http://localhost:3000";

  React.useEffect(() => {
    async function getUser() {
      const tokenLocal = window.localStorage.getItem("token");
      if (tokenLocal) {
        global.setToken(tokenLocal);
        global.setLogin(true);
        if (!edit) {
          return <Navigate to="/dashboard" />;
        } else {
          const user = await global.user;

          if (user.name && user.email) {
            setName(user.name);
            setEmail(user.email);
          }
        }
      }
    }
    getUser();
  }, [global.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!edit) {
      const data = {
        name,
        email,
        password,
        confirmpassword: confirmPassword,
      };

      const jsonData = JSON.stringify(data);

      await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: jsonData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage(data.msg);
            setSuccess(true);
            setAuthenticate(true);
            global.setLogin(true);
            global.setToken(data.token);
            global.setId(data.userId);
            window.localStorage.setItem("token", data.token);
          }

          setTimeout(() => {
            if (!authenticate) {
              setMessage(null);
            }
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const data = {
        id: global.id,
        name,
        email,
        password,
        confirmpassword: confirmPassword,
      };

      const jsonData = JSON.stringify(data);
      let token = global.token;

      if (!token) {
        token = window.localStorage.getItem("token");
      }

      await fetch(`${apiUrl}/api/user`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
        body: jsonData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
            setSuccess(false);
          } else {
            setMessage(data.msg);
            setSuccess(true);
          }

          setTimeout(() => {
            setMessage(null);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (authenticate === true && !edit) {
    return <Navigate to="/dashboard" />;
  } else if (global.login === true && !edit) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      {message && <Message message={message} success={success} />}
      <form className={styles.userForm} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.label}>
            Nome:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Digite o seu nome"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.label}>
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Digite o seu email"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.label}>
            Senha
          </label>
          <input
            type="password"
            id="senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite a sua senha"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="confirmpassword" className={styles.label}>
            Senha
          </label>
          <input
            type="password"
            id="confrmpassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Digite a sua senha novamente"
            className={styles.input}
          />
        </div>
        {!edit ? (
          <InputSubmit value="Cadastrar" />
        ) : (
          <InputSubmit value="Editar" />
        )}
      </form>
    </>
  );
};

export default UserForm;
