import type { Lang } from "@/lib/LanguageContext";

export type AudienceTranslations = {
    title: string;
    minimalAge: string;
    ageGroup: string;
    audienceLabel: string;
    defaultAdultAge: string;
    defaultKidsAge: string;
};

export const translations: Record<Lang, AudienceTranslations> = {
    en: {
        title: "Suitable for Various Learners",
        minimalAge: "minimal age",
        ageGroup: "age group",
        audienceLabel: "Audience:",
        defaultAdultAge: "15+",
        defaultKidsAge: "7-14",
    },
    bg: {
        title: "Подходящо за различни ученици",
        minimalAge: "минимална възраст",
        ageGroup: "възрастова група",
        audienceLabel: "Аудитория:",
        defaultAdultAge: "15+",
        defaultKidsAge: "7-14",
    },
};
