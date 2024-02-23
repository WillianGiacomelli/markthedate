import styles from "./Message.module.css";

// eslint-disable-next-line react/prop-types
const Message = ({ message, success }) => {
  return <p className={success ? styles.success : styles.error}>{message}</p>;
};

export default Message;
