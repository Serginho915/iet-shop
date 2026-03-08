import type { Lang } from "@/lib/LanguageContext";

export type HeroCourseTranslations = {
    start: string;
    price: string;
    bookSpot: string;
    beginnerFriendly: string;
};

export const translations: Record<Lang, HeroCourseTranslations> = {
    en: {
        start: "Starts",
        price: "Price",
        bookSpot: "Book a Spot",
        beginnerFriendly: "Beginner Friendly",
    },
    bg: {
        start: "Начало",
        price: "Цена",
        bookSpot: "Запишете се",
        beginnerFriendly: "Подходящо за начинаещи",
    },
};
