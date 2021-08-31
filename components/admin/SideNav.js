import styles from "./SideNav.module.scss";
import { FaHome } from "react-icons/fa";

export default function SideNav(props) {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.Container}>
        <div className={styles.CoreContainer}>
          <h4 className={styles.CategoryHeader}>Core</h4>
          <a
            className={`${styles.NavLink} ${styles.NavLinkActive}`}
            href="https://8kcgg.sse.codesandbox.io/admin"
          >
            <FaHome /> Dashboard
          </a>
        </div>
      </div>
      <div className={styles.User}>
        <h6>logged in as:</h6>

        {props.session && (
          <>
            <h6 className={styles.userName}>{props.session.user.name}</h6>
          </>
        )}
      </div>
    </div>
  );
}
