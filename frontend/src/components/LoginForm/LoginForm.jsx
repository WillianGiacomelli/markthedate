import React from "react";
import Message from "../Message/Message";
import styles from "./LoginForm.module.css";
import InputSubmit from "../InputSubmit/InputSubmit";
import { UserContext } from "../../../UserContext";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [message, setMessage] = React.useState();
  const [success, setSuccess] = React.useState(false);
  const [authenticate, setAuthenticate] = React.useState();

  const global = React.useContext(UserContext);

  const apiUrl = "http://localhost:3000";

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    const jsonData = JSON.stringify(data);

    await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          window.localStorage.setItem("id", data.userId);
        }

        setTimeout(() => {
          if (!authenticate) {
            setMessage(null);
          }
        }, 2000);
      });
  }

  if (authenticate === true) {
    return <Navigate to="/dashboard" />;
  } else if (global.login === true) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div>
      {message && <Message sucess={success} message={message} />}
      <form onSubmit={handleSubmit} className={styles.loginForm}>
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
          <label htmlFor="senha" className={styles.label}>
            Senha:
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
        <InputSubmit value="Fazer login" />
      </form>
    </div>
  );
};

export default LoginForm;
