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
        online: "online",
        offline: "offline",
        start: "start",
    },
    bg: {
        leaveRequest: "Остави заявка",
        months: "месеца",
        hybrid: "хибридно (офлайн/онлайн)",
        online: "онлайн",
        offline: "офлайн",
        start: "начало",
    },
};
