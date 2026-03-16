import type { Lang } from "@/lib/LanguageContext";

export type LearnTranslations = {
    instrumentsTitle: string;
    outcomeTitle: string;
    leaveRequest: string;
};

export const translations: Record<Lang, LearnTranslations> = {
    en: {
        instrumentsTitle: "Instruments You'll Learn",
        outcomeTitle: "As a result you will be ready to:",
        leaveRequest: "Leave Request",
    },
    bg: {
        instrumentsTitle: "Инструменти, които ще научите",
        outcomeTitle: "В резултат ще бъдете готови да:",
        leaveRequest: "Остави запитване",
    },
};
