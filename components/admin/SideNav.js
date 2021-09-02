import styles from "./SideNav.module.scss";
import {
  FaHome,
  FaCalendar,
  FaUser,
  FaInbox,
  FaEnvelopeSquare
} from "react-icons/fa";

import { useRouter, withRouter } from "next/router";
function SideNav(props) {
  const router = useRouter();
  const Applications = [
    {
      title: "Calender",
      icon: <FaCalendar />,
      active: props.router.query.active === "Calender"
    },
    {
      title: "Users",
      icon: <FaUser />,
      active: props.router.query.active === "Users"
    },
    {
      title: "Messages",
      icon: <FaInbox />,
      active: props.router.query.active === "Messages"
    },
    {
      title: "Email",
      icon: <FaEnvelopeSquare />,
      active: props.router.query.active === "Email"
    }
  ];

  return (
    <div className={styles.MainContainer}>
      <div className={styles.Container}>
        <div className={styles.CoreContainer}>
          <h4 className={styles.CategoryHeader}>Core</h4>
          <div
            className={`${styles.NavLink} ${
              !props.router.query.active && styles.NavLinkActive
            }`}
            onClick={() => {
              router.push({
                pathname: `/admin`
              });
            }}
          >
            <a className={styles.NavLinkIcon}>
              <FaHome />
            </a>
            <a className={styles.NavLinkTitle}>Dashboard</a>
          </div>
        </div>
        <div className={styles.ApplicationsContainer}>
          <h4 className={styles.CategoryHeader}>Applications</h4>
          {Applications.map((item) => (
            <div
              className={`${styles.NavLink} ${
                item.active && styles.NavLinkActive
              }`}
              onClick={() => {
                router.push({
                  pathname: `/admin`,
                  query: { active: item.title }
                });
              }}
            >
              <a className={styles.NavLinkIcon}>{item.icon}</a>
              <a className={styles.NavLinkTitle}>{item.title}</a>
            </div>
          ))}
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

export default withRouter(SideNav);
