import styles from "./InputSubmit.module.css";

const InputSubmit = (props) => {
  return <input type="submit" value={props.value} className={styles.button} />;
};

export default InputSubmit;
