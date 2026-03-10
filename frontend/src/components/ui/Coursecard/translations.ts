import type { Lang } from "@/lib/translations";

type CourseCardTranslations = {
    leaveRequest: string;
    months: string;
    hybrid: string;
    online: string;
    offline: string;
    start: string;
};

export const translations: Record<Lang, CourseCardTranslations> = {
    en: {
        leaveRequest: "Leave Request",
        months: "months",
        hybrid: "hybrid (offline/online)",
        online: "Online",
        offline: "Offline",
        start: "Start",
    },
    bg: {
        leaveRequest: "Остави заявка",
        months: "месеца",
        hybrid: "Хибридно (Офлайн/Онлайн)",
        online: "Онлайн",
        offline: "Офлайн",
        start: "Начало",
    },
};
