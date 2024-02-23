import React from "react";
import styles from "./Profile.module.css";
import UserForm from "../../components/UserForm/UserForm";
import { UserContext } from "../../../UserContext";

const Profile = () => {
  // const [dataUser, setDataUser] = React.useState(null);
  const global = React.useContext(UserContext);

  React.useEffect(() => {
    global.getUser();
  }, []);
  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>Edite seu perfil</h1>
      <UserForm edit={true} />
    </div>
  );
};

export default Profile;
