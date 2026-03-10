import type { Lang } from "@/lib/LanguageContext";

export type AudienceTranslations = {
    title: string;
    minimalAge: string;
    maximalAge: string;
    audienceLabel: string;
    defaultAdultAge: string;
    defaultKidsAge: string;
};

export const translations: Record<Lang, AudienceTranslations> = {
    en: {
        title: "Suitable for Various Learners",
        minimalAge: "minimal age",
        maximalAge: "maximal age",
        audienceLabel: "Audience:",
        defaultAdultAge: "15+",
        defaultKidsAge: "7-14",
    },
    bg: {
        title: "Подходящо за различни ученици",
        minimalAge: "минимална възраст",
        maximalAge: "максимална възраст",
        audienceLabel: "Аудитория:",
        defaultAdultAge: "15+",
        defaultKidsAge: "7-14",
    },
};
