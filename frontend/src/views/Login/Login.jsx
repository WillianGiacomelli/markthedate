import React from "react";
import styles from "./Login.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Entrar no Mark The Date</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
