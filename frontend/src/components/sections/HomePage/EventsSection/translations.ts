import type { Lang } from "@/lib/LanguageContext";

export type Event = {
    id: string;
    title: string;
    date: string;
    tags: string[];
    isFree: boolean;
    location: string;
    joinUrl: string;
};

export type EventsTranslations = {
    title: string;
    badge: string;
    dateLabel: string;
    joinBtn: string;
    noEvents: string;
};

export const translations: Record<Lang, EventsTranslations> = {
    en: {
        title: "Upcoming Events",
        badge: "Don't miss out!",
        dateLabel: "Date",
        joinBtn: "Join",
        noEvents: "No upcoming events",
    },
    bg: {
        title: "Предстоящи събития",
        badge: "Не пропускайте!",
        dateLabel: "Дата",
        joinBtn: "Включи се",
        noEvents: "Няма предстоящи събития",
    }
};
