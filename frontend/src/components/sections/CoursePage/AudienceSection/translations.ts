import type { Lang } from "@/lib/LanguageContext";

export type AudienceTranslations = {
    title: string;
    minimalAge: string;
    maximalAge: string;
    audienceLabel: string;
};

export const translations: Record<Lang, AudienceTranslations> = {
    en: {
        title: "Suitable for Various Learners",
        minimalAge: "minimal age",
        maximalAge: "maximal age",
        audienceLabel: "Audience:",
    },
    bg: {
        title: "Подходящо за различни ученици",
        minimalAge: "минимална възраст",
        maximalAge: "максимална възраст",
        audienceLabel: "Аудитория:",
    },
};
