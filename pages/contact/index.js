import styles from "./Contact.module.scss";

import {useState} from "react";
import {useRouter} from 'next/router'
import { FaTimes } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({name: "", email: "", message: ""});
  const [alertTimeOut, setAlertTimeOut] = useState(null);
  const [modalShown, setModalShown] = useState(false);
  const router = useRouter();
  
  const sendForm = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/message`, {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(data => {
        if(data.good === "good"){
          setFormData({name: "", email: "", message: ""});
          setModalShown(true);
          if(!alertTimeOut) {
            setAlertTimeOut(setTimeout(() => {
              setModalShown(false);
              setAlertTimeOut(null);
            }, 2500));
          }
        }
      })
      .catch(err => console.log(err));
  }
  const setValue = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div className={styles.Contact}>
        <div className={`${modalShown ? styles.AlertShown : styles.AlertHidden} ${styles.Alert}`} >
          <FaTimes onClick={(e) => {
            e.preventDefault();
            setModalShown(false);
          }} size={24} className={styles.exit}/>
          <span className={styles.head}>Message Recieved</span>
          <span className={styles.body}>Thanks for your message, I will try to respond ASAP.</span>
        </div>
        <div className={styles.ContactHeaderContainer}>
          <h1 className={styles.ContactHeader}>Contact Me</h1>
          <h4 className={styles.ContactInfo}>Have an inquiries about a project? Fill out this form below to get in contact with me, I will respond in ~1-2 days</h4>
        </div>
        <div className={styles.ContactFormContainer}>
          <form className={styles.ContactForm}>
            <div className={styles.FormRow}>
              <div className={styles.FormNameContainer}>
                <input className={styles.FormNameInput} name="name" onChange={setValue} value={formData.name} placeholder="NAME" type="string" />
              </div>
              <div className={styles.FormEmailContainer}>
                <input className={styles.FormEmailInput} name="email" onChange={setValue} value={formData.email} placeholder="EMAIL" type="email" />
              </div>
            </div>
            <div className={styles.FormRow}>
              <div className={styles.FormMessageContainer}>
                <textarea className={styles.FormMessageInput} name="message"  onChange={setValue} value={formData.message} rows={8}/>

              </div>
            </div>
            <div className={`${styles.buttonHolder} buttonHolder`}>
                <button className={styles.submitButton} onClick={sendForm} type="submit">
                  Submit
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


const button = () => {
  return (
    <div className={`${styles.buttonHolder} buttonHolder`}>
        <button className={styles.submitButton} onClick={sendForm} type="submit">
          Submit
        </button>
    </div>
  )
}