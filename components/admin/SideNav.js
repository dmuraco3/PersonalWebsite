import styles from "./SideNav.module.scss";
import {
  FaHome,
  FaArrowCircleRight,
  FaArrowAltCircleLeft,
  FaArrowCircleLeft
} from "react-icons/fa";

import { useRouter, withRouter } from "next/router";
import { useState } from "react";
function SideNav(props) {
  const router = useRouter();
  const Applications = props.Applications;
  const [open, setOpen] = useState(true)

  return (
    <div className={styles.MainMain}>
      {!open && <>
        <div className={styles.ArrowContainer} onClick={(e) => {
          e.preventDefault()
          if(open) {
            setOpen(false)
          } else {
            setOpen(true)
          }
        }}>
          {open && <FaArrowCircleRight size={30}/>}
          {!open && <FaArrowCircleLeft size={30}/>}

        </div>
        
      </>}
      <div className={open ? `${styles.MainContainer} ${styles.MainContainerOpen}` : `${styles.MainContainer} ${styles.MainContainerClose}`}>
        {open && <>
          <div className={styles.ArrowContainer} onClick={(e) => {
            e.preventDefault()
            if(open) {
              setOpen(false)
            } else {
              setOpen(true)
            }
          }}>
            {open && <FaArrowCircleRight size={30}/>}
            {!open && <FaArrowCircleLeft size={30}/>}

          </div>
          
        </>}
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
            {Applications.map((item, index) => (
              <div
                key={index}
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
    </div>
    
  );
}

export default withRouter(SideNav);
