import type { Lang } from "@/lib/LanguageContext";

export type CoursePageTranslations = {
  title: string;
  description: string;
  course: string;
  start: string;
};

export const translations: Record<Lang, CoursePageTranslations> = {
  en: {
    title: "Course Details",
    description: "Learn more about our professional training programs.",
    course: "Courses",
    start: "Starts",
  },
  bg: {
    title: "Детайли за курса",
    description: "Научете повече за нашите професионални програми за обучение.",
    course: "Курсове",
    start: "Начало",
  },
};
