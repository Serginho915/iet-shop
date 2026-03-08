import type { Lang } from "@/lib/translations";

type CoursesTranslations = {
    choosePath: string;
    tipLabel: string;
    tipText: string;
    helpDeciding: string;
    helpDecidingText: string;
    allAudience: string;
    forAdults: string;
    forKids: string;
    categoryPlaceholder: string;
    formatPlaceholder: string;
    noResults: string;
};


export type CourseTypeFilter = {
    id: string;
    name: string;
}

export const courseTypes: Record<Lang, CourseTypeFilter[]> = {
    en: [
        { id: 'all', name: 'All Formats' },
        { id: 'hybrid', name: 'Hybrid' },
        { id: 'online', name: 'Online' },
        { id: 'offline', name: 'Offline' },
    ],
    bg: [
        { id: 'all', name: 'Всички формати' },
        { id: 'hybrid', name: 'Хибриден' },
        { id: 'online', name: 'Онлайн' },
        { id: 'offline', name: 'Офлайн' },
    ],
}

export const translations: Record<Lang, CoursesTranslations> = {
    en: {
        choosePath: "Choose Your Path",
        tipLabel: "Tip:",
        tipText: "No experience needed. Every course is beginner friendly.",
        helpDeciding: "Need help with deciding?",
        helpDecidingText: "Contact us via an online form.",
        allAudience: "All",
        forAdults: "For Adults",
        forKids: "For Kids",
        categoryPlaceholder: "Category",
        formatPlaceholder: "Format",
        noResults: "No courses found matching these criteria.",
    },
    bg: {
        choosePath: "Изберете своя път",
        tipLabel: "Съвет:",
        tipText: "Не е необходим опит. Всеки курс е подходящ за начинаещи.",
        helpDeciding: "Нуждаете се от помощ при избора?",
        helpDecidingText: "Свържете се с нас чрез онлайн форма.",
        allAudience: "Всички",
        forAdults: "За възрастни",
        forKids: "За деца",
        categoryPlaceholder: "Категория",
        formatPlaceholder: "Формат",
        noResults: "Не са намерени курсове, отговарящи на тези критерии.",
    },
};
