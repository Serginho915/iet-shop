import React, { useState } from "react";
import styles from "./ChatButton.module.scss";

export const ChatButton = () => {
  const [isChatOpened, setIsChatOpened] = useState(false);
  const handleClick = () => {
    setIsChatOpened((prev) => !prev);
  };

  return (
    <div>
      <button className={styles.chatButton} onClick={handleClick}>
        Live chat
      </button>
    </div>
  );
};
