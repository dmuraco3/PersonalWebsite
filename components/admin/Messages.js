import styles from './Messages.module.scss'
import {useEffect, useState} from 'react'
export default function Messages() {

  const [messages, setMessages] = useState()
  useEffect(() => {
    if(!messages) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/messages `)
      .then (res => res.json())
      .then (res => setMessages(res))
    }
  }, [])
  return <div className={styles.main}>
    <h1 className={styles.header}>Messages</h1>
    <div className={styles.messages}>
      {messages && messages.map(message => (
        <div key={message.id }className={styles.message}>
          <span className={styles.from}><b>message from:</b> {message.name}</span>
          <span className={styles.email}><b>email:</b> <a href={`mailto:${message.email}`}>{message.email}</a></span>
          <p className={styles.body}>{message.message}</p>
        </div>
      ))}
    </div>
  </div>;
}
