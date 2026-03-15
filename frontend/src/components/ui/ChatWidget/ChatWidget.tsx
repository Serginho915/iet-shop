"use client";

import {
    FormEvent,
    startTransition,
    useEffect,
    useEffectEvent,
    useRef,
    useState,
} from "react";

import {
    buildChatWebSocketUrl,
    ChatMessage,
    ChatSocketEvent,
    getChatMessages,
    initChatSession,
    sendChatMessage,
} from "@/lib/chat";

import styles from "./ChatWidget.module.scss";

type ConnectionState = "idle" | "connecting" | "connected" | "reconnecting" | "error";

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY_MS = 3000;

const sortMessages = (messages: ChatMessage[]) =>
    [...messages].sort(
        (left, right) =>
            new Date(left.created_at).getTime() - new Date(right.created_at).getTime(),
    );

const mergeMessages = (current: ChatMessage[], incoming: ChatMessage[]) => {
    const messageMap = new Map<number, ChatMessage>();

    for (const message of current) {
        messageMap.set(message.id, message);
    }

    for (const message of incoming) {
        messageMap.set(message.id, message);
    }

    return sortMessages(Array.from(messageMap.values()));
};

const formatTime = (value: string) =>
    new Intl.DateTimeFormat("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
    }).format(new Date(value));

export function ChatWidget() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [draft, setDraft] = useState("");
    const [status, setStatus] = useState<ConnectionState>("idle");
    const [error, setError] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);

    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const disposedRef = useRef(false);

    const syncMessages = useEffectEvent((incoming: ChatMessage[]) => {
        startTransition(() => {
            setMessages((current) => mergeMessages(current, incoming));
        });
    });

    const applySocketEvent = useEffectEvent((event: ChatSocketEvent) => {
        if (event.type === "chat.message") {
            syncMessages([event.message]);
            setError(null);
            return;
        }

        if (event.type === "chat.error") {
            const detail =
                typeof event.detail === "string" ? event.detail : JSON.stringify(event.detail);
            setError(detail);
            setStatus("error");
        }
    });

    const resyncHistory = useEffectEvent(async () => {
        const freshMessages = await getChatMessages();
        syncMessages(freshMessages);
    });

    const scheduleReconnect = useEffectEvent(() => {
        if (disposedRef.current || reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
            setStatus("error");
            return;
        }

        if (reconnectTimeoutRef.current !== null) {
            window.clearTimeout(reconnectTimeoutRef.current);
        }

        reconnectAttemptsRef.current += 1;
        setStatus("reconnecting");
        reconnectTimeoutRef.current = window.setTimeout(() => {
            void openSocket();
        }, RECONNECT_DELAY_MS);
    });

    const openSocket = useEffectEvent(async () => {
        if (disposedRef.current) {
            return;
        }

        if (socketRef.current) {
            socketRef.current.onclose = null;
            socketRef.current.onmessage = null;
            socketRef.current.onerror = null;
            socketRef.current.close();
        }

        setStatus(reconnectAttemptsRef.current > 0 ? "reconnecting" : "connecting");

        const socket = new WebSocket(buildChatWebSocketUrl());
        socketRef.current = socket;

        socket.onopen = () => {
            reconnectAttemptsRef.current = 0;
            setStatus("connected");
            setError(null);
            void resyncHistory().catch(() => {
                setError("Не удалось синхронизировать историю чата после подключения.");
            });
        };

        socket.onmessage = (rawEvent) => {
            try {
                const event = JSON.parse(rawEvent.data) as ChatSocketEvent;
                applySocketEvent(event);
            } catch {
                setError("Не удалось разобрать сообщение WebSocket.");
            }
        };

        socket.onclose = () => {
            if (!disposedRef.current) {
                scheduleReconnect();
            }
        };

        socket.onerror = () => {
            setError("WebSocket соединение завершилось с ошибкой.");
        };
    });

    const bootstrapChat = useEffectEvent(async () => {
        setStatus("connecting");
        const initialState = await initChatSession();
        syncMessages(initialState.messages);
        await openSocket();
    });

    useEffect(() => {
        disposedRef.current = false;
        void bootstrapChat().catch((bootstrapError) => {
            setStatus("error");
            setError(
                bootstrapError instanceof Error
                    ? bootstrapError.message
                    : "Не удалось инициализировать чат.",
            );
        });

        return () => {
            disposedRef.current = true;
            if (reconnectTimeoutRef.current !== null) {
                window.clearTimeout(reconnectTimeoutRef.current);
            }
            if (socketRef.current) {
                socketRef.current.onclose = null;
                socketRef.current.onmessage = null;
                socketRef.current.onerror = null;
                socketRef.current.close();
            }
        };
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const text = draft.trim();
        if (!text) {
            return;
        }

        setIsSending(true);
        setError(null);
        setDraft("");

        try {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify({ type: "message", text }));
            } else {
                const createdMessage = await sendChatMessage(text);
                syncMessages([createdMessage]);
            }
        } catch (sendError) {
            setDraft(text);
            setError(sendError instanceof Error ? sendError.message : "Не удалось отправить сообщение.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className={styles.chat} aria-label="Anonymous chat widget">
            <header className={styles.header}>
                <h2 className={styles.title}>Чат поддержки</h2>
                <span className={styles.status}>Статус: {status}</span>
            </header>

            <div className={styles.messages}>
                {messages.length === 0 ? (
                    <p className={styles.empty}>Сообщений пока нет. Напишите первым.</p>
                ) : (
                    messages.map((message) => (
                        <article
                            key={message.id}
                            className={`${styles.message} ${styles[message.sender_type]}`}
                        >
                            <div>{message.text}</div>
                            <time className={styles.meta} dateTime={message.created_at}>
                                {message.sender_type} • {formatTime(message.created_at)}
                            </time>
                        </article>
                    ))
                )}
            </div>

            {error ? <div className={styles.error}>{error}</div> : null}

            <form className={styles.form} onSubmit={handleSubmit}>
                <textarea
                    className={styles.textarea}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    maxLength={2000}
                    placeholder="Введите сообщение"
                />

                <div className={styles.actions}>
                    <span className={styles.hint}>Сессия хранится в cookie `sessionid`.</span>
                    <button className={styles.button} type="submit" disabled={isSending || !draft.trim()}>
                        {isSending ? "Отправка..." : "Отправить"}
                    </button>
                </div>
            </form>
        </section>
    );
}