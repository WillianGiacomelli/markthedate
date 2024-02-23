import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { UserContext } from "../../../UserContext";

const Navbar = () => {
  const { login, logout } = React.useContext(UserContext);
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logoContainer}>
        <img src="./img/logo.png" alt="markthedate" className={styles.img} />
      </Link>
      <h2 className={styles.navTitle}>Mark The Date</h2>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        {!login ? (
          <Link to="/entrar" className={styles.link}>
            Entrar
          </Link>
        ) : (
          <Link to="/dashboard" className={styles.link}>
            Dashboard
          </Link>
        )}
        ;
        {!login ? (
          <Link to="/register" className={styles.link}>
            Cadastrar
          </Link>
        ) : (
          <Link to="/profile" className={styles.link}>
            Configurações
          </Link>
        )}
        {login && (
          <button className={styles.botao} onClick={() => logout()}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
