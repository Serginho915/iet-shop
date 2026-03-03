import type { Lang } from "@/lib/translations";

type CoursesTranslations = {
  courses: string;
  allCourses: string;
  online: string;
  offline: string;
  hybrid: string;
};

export const translations: Record<Lang, CoursesTranslations> = {
  en: {
    courses: "Courses",
    allCourses: "All Courses",
    online: "Online",
    offline: "Offline",
    hybrid: "Hybrid",
  },
  bg: {
    courses: "Курсове",
    allCourses: "Всички курсове",
    online: "Онлайн",
    offline: "Офлайн",
    hybrid: "Хибрид",
  },
};


