import React from "react";
import styles from "./ChatButton.module.scss";

interface ChatButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export const ChatButton = ({ isOpen, onClick }: ChatButtonProps) => {
    return (
        <div className={styles.btnWrapper}>
            <button className={styles.chatButton} onClick={onClick}>
                {isOpen ? "Close chat" : "Live chat"}
            </button>
        </div>
    );
};
