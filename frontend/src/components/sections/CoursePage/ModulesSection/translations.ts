import type { Lang } from "@/lib/LanguageContext";

export type ModulesTranslations = {
    title: string;
    noModules: string;
};

export const translations: Record<Lang, ModulesTranslations> = {
    en: {
        title: "Modules to Practice",
        noModules: "No modules available for this course."
    },
    bg: {
        title: "Практически модули",
        noModules: "Няма налични модули за този курс."
    },
};
