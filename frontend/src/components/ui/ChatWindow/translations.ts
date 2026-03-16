import { Lang } from "@/lib/translations";

export type ChatTranslations = {
    title: string;
    subTitle: string;
    welcomeTitle: string;
    welcomeText: string;
    inputPlaceholder: string;
    send: string;
    connecting: string;
    networkError: string;
    sending: string;
    emptyHistory: string;
    errorSync: string;
    errorParse: string;
    errorConnection: string;
    errorInit: string;
    errorSend: string;
};

export const translations: Record<Lang, ChatTranslations> = {
    en: {
        title: "George",
        subTitle: "our agent",
        welcomeTitle: "Hello 👋",
        welcomeText: "We're here to answer your questions!",
        inputPlaceholder: "Ask anything",
        send: "Send",
        connecting: "Connecting...",
        networkError: "Network error",
        sending: "Sending...",
        emptyHistory: "No messages yet. Be the first to write!",
        errorSync: "Failed to sync history after connection.",
        errorParse: "Failed to parse message.",
        errorConnection: "WebSocket connection error.",
        errorInit: "Failed to initialize chat.",
        errorSend: "Failed to send message.",
    },
    bg: {
        title: "Георги",
        subTitle: "нашият агент",
        welcomeTitle: "Здравейте 👋",
        welcomeText: "Тук сме, за да отговорим на вашите въпроси!",
        inputPlaceholder: "Попитайте ни нещо",
        send: "Изпрати",
        connecting: "Свързване...",
        networkError: "Мрежова грешка",
        sending: "Изпращане...",
        emptyHistory: "Все още няма съобщения. Пишете първи!",
        errorSync: "Неуспешно синхронизиране на историята след свързване.",
        errorParse: "Неуспешно разчитане на съобщението.",
        errorConnection: "Грешка при WebSocket връзката.",
        errorInit: "Неуспешно инициализиране на чата.",
        errorSend: "Неуспешно изпращане на съобщението.",
    },
};
