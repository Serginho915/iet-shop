"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslate } from "@/lib/useTranslate";
import { translations, ChatTranslations } from "./translations";
import styles from "./ChatWindow.module.scss";
import georgeAvatar from "@/assets/emojii/GeorgeAvatar.png";
import { API_URL } from "@/lib/api";

interface Message {
    id: number;
    text: string;
    sender: "user" | "agent";
    timestamp: Date;
}

interface ChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChatWindow = ({ isOpen, onClose }: ChatWindowProps) => {
    const { t } = useTranslate<ChatTranslations>(translations);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isSessionActive] = useState(true);
    const [errors, setErrors] = useState({});

    const lastIdRef = useRef<number>(0);
    const abortControllerRef = useRef<AbortController | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load messages from localStorage 
    useEffect(() => {
        try {
            const storedMessages = localStorage.getItem("chatMessages");
            if (storedMessages) {
                const parsedMessages: Message[] = JSON.parse(storedMessages).map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp), // Convert timestamp string back to Date object
                }));
                setMessages(parsedMessages);
                if (parsedMessages.length > 0) {
                    lastIdRef.current = parsedMessages[parsedMessages.length - 1].id;
                }
            }
        } catch (error) {
            console.error("Failed to load messages from localStorage:", error);
        }
    }, []);


    useEffect(() => {
        try {
            localStorage.setItem("chatMessages", JSON.stringify(messages));
        } catch (error) {
            console.error("Failed to save messages to localStorage:", error);
        }
    }, [messages]);


    const pollMessages = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        try {
            const res = await fetch(`${API_URL}/chat/messages/?last_id=${lastIdRef.current}`, {
                signal: abortControllerRef.current.signal
            });

            if (res.status === 200) {
                const newMessages = await res.json();
                if (newMessages.length > 0) {
                    setMessages(prev => [...prev, ...newMessages]);
                    lastIdRef.current = newMessages[newMessages.length - 1].id;
                }
                pollMessages();
            } else if (res.status === 204 || res.status === 502) {
                pollMessages();
            } else {
                setTimeout(() => pollMessages(), 5000);
            }
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                setTimeout(() => pollMessages(), 5000);
            }
        }
    }, []);

    useEffect(() => {
        // Initialize polling 
        pollMessages();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [pollMessages]);

    if (!isOpen) return null;


    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const textToSend = inputValue;
        setInputValue("");

        const tempId = Date.now();
        const newMessage: Message = {
            id: tempId,
            text: textToSend,
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);

        try {
            const res = await fetch(`${API_URL}/chat/send/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: textToSend
                }),
            });

            if (!res.ok) {
                console.error("Failed to send message");
            }
        } catch (e) {
            console.error("Network error sending message", e);
        }
    };

    const handleWrapperClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className={styles.chatWindow}>
            <div className={styles.header}>
                <div className={styles.agentInfo}>
                    <div className={styles.avatarWrapper}>
                        <Image src={georgeAvatar} alt="George" fill className={styles.avatar} />
                    </div>
                    <div className={styles.textInfo}>
                        <span className={styles.name}>{t.title}</span>
                        <span className={styles.subtext}>{t.subTitle}</span>
                    </div>
                </div>
                <button onClick={onClose} className={styles.closeBtn} aria-label="Close">
                    X
                </button>
            </div>

            <div className={styles.content}>
                {messages.length === 0 ? (
                    <div className={styles.welcomeScreen}>
                        <h2 className={styles.welcomeTitle}>{t.welcomeTitle}</h2>
                        <p className={styles.welcomeText}>{t.welcomeText}</p>
                    </div>
                ) : (
                    <div className={styles.messagesList}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`${styles.messageItem} ${msg.sender === "user" ? styles.userMessage : styles.agentMessage
                                    }`}
                            >
                                <div className={styles.messageBubble}>{msg.text}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isSessionActive && (
                <div className={styles.inputContainer}>
                    <div className={styles.inputWrapper} onClick={handleWrapperClick}>
                        <input
                            ref={inputRef}
                            type="text"
                            className={styles.input}
                            placeholder={t.inputPlaceholder}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            id="chat-message-input"
                            name="message"
                        />
                        <button
                            className={`${styles.sendBtn} ${inputValue.trim() ? styles.active : ""}`}
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 19V5M12 5L5 12M12 5L19 12"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
