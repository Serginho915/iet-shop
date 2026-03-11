import type { Lang } from "@/lib/LanguageContext";

export type HeroCourseTranslations = {
    start: string;
    price: string;
    bookSpot: string;
    beginnerFriendly: string;
    month: string;
    visitsPerWeek: string;
};

export const translations: Record<Lang, HeroCourseTranslations> = {
    en: {
        start: "Starts",
        price: "Price",
        bookSpot: "Book a Spot",
        beginnerFriendly: "Beginner Friendly",
        month: "month",
        visitsPerWeek: "visits per week",
    },
    bg: {
        start: "Начало",
        price: "Цена",
        bookSpot: "Запишете се",
        beginnerFriendly: "Подходящо за начинаещи",
        month: "месец",
        visitsPerWeek: "посещения седмично",
    },
};
