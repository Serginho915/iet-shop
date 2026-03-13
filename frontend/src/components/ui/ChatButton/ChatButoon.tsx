import React from "react";
import styles from "./ChatButton.module.scss";

interface ChatButtonProps {
  onClick: () => void;
  isOpen?: boolean;
  openLabel?: string;
  closeLabel?: string;
}

export const ChatButton = ({
  onClick,
  isOpen = false,
  openLabel = "Live chat",
  closeLabel = "Close chat",
}: ChatButtonProps) => {
  const label = isOpen ? closeLabel : openLabel;

  return (
    <div>
      <button
        type="button"
        className={styles.chatButton}
        onClick={onClick}
        aria-pressed={isOpen}
      >
        {label}
      </button>
    </div>
  );
};
