import { Lang } from "@/lib/translations";

export type ChatTranslations = {
    title: string;
    subTitle: string;
    welcomeTitle: string;
    welcomeText: string;
    inputPlaceholder: string;
    send: string;
    // emailLabel: string;
    // topicLabel: string;
    // startChat: string;
    // emailError: string;
    // topicError: string;
    // requiredError: string;
};

export const translations: Record<Lang, ChatTranslations> = {
    en: {
        title: "George",
        subTitle: "our agent",
        welcomeTitle: "Hello 👋",
        welcomeText: "We're here to answer your questions!",
        inputPlaceholder: "Ask anything",
        send: "Send",
        // emailLabel: "Email",
        // topicLabel: "Topic",
        // startChat: "Start Chat",
        // emailError: "Please enter a valid email",
        // topicError: "Please enter a topic",
        // requiredError: "This field is required",
    },
    bg: {
        title: "Георги",
        subTitle: "нашият агент",
        welcomeTitle: "Здравейте 👋",
        welcomeText: "Тук сме, за да отговорим на вашите въпроси!",
        inputPlaceholder: "Попитайте ни нещо",
        send: "Изпрати",
        // emailLabel: "Имейл",
        // topicLabel: "Тема",
        // startChat: "Започни чат",
        // emailError: "Моля, въведете валиден имейл",
        // topicError: "Моля, въведете тема",
        // requiredError: "Това поле е задължително",
    },
};
