import React from 'react';
import styles from "styles/index.module.css";


const Message = ({ author, text, timestamp }) => (
  <>
  <div className={author === 'User' ? styles.messageRight : styles.messageLeft}>
    {text}
    <div className={author === 'User' ? styles.subtextRight : styles.subtextLeft}>
    {timestamp}-{author}
      </div>

  </div>
  </>
);

export default Message;
