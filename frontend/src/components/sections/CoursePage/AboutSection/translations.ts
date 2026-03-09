import type { Lang } from "@/lib/LanguageContext";

type AboutTranslations = {
    title: string;
};

export const translations: Record<Lang, AboutTranslations> = {
    en: {
        title: "About the Course",
    },
    bg: {
        title: "За курса",
    },
};