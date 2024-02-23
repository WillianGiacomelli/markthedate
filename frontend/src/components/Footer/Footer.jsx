import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.title}>Mark the Date &copy; 2024</h3>
      <p className={styles.text}>
        O melhor aplicativo para acompanhar seus eventos
      </p>
    </footer>
  );
};

export default Footer;
