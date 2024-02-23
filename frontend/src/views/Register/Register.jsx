import UserForm from "../../components/UserForm/UserForm";
import styles from "./Register.module.css";

const Register = () => {
  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Criar conta</h1>
      <UserForm />
    </div>
  );
};

export default Register;
