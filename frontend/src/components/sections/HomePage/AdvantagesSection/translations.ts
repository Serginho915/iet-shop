import type { Lang } from "@/lib/translations";

type Advantage = {
    title: string;
    description: string;
    bg?: string;
};

type AdvantagesTranslations = {
    title: string;
    subtitle: string;
    items: Advantage[];
};

export const translations: Record<Lang, AdvantagesTranslations> = {
    en: {
        title: "Learning Tech has ",
        subtitle: "never been easier",
        items: [
            {
                title: "Expert Mentors",
                description: "Learn from industry professionals with years of real-world experience.",
                bg: "#5A55F4"
            },
            {
                title: "Practical Learning",
                description: "Focus on hands-on project and real-world scenarios.",
                bg: "#DEE5FF"
            },
            {
                title: "Career Support",
                description: "We help you with job search and interview preparation.",
                bg: "#DEE5FF"
            },
            {
                title: "Flexible Format",
                description: "Choose between online, offline, or hybrid learning models.",
                bg: "#E0F6F8"
            },
            {
                title: "Modern Tech Stack",
                description: "Our curriculum is always up-to-date with industry standards.",
                bg: "#DEE5FF"
            }
        ]
    },
    bg: {
        title: "Ученето на технологии никога ",
        subtitle: "не е било по-лесно",
        items: [
            {
                title: "Експертни ментори",
                description: "Учете се от професионалисти в бранша с опит.",
                bg: "#5A55F4"
            },
            {
                title: "Практическо обучение",
                description: "Фокус върху практиката и проекти.",
                bg: "#DEE5FF"
            },
            {
                title: "Кариерна подкрепа",
                description: "Помагаме ви с търсенето на работа.",
                bg: "#DEE5FF"
            },
            {
                title: "Гъвкав формат",
                description: "Изберете между онлайн, офлайн или хибридни.",
                bg: "#E0F6F8"
            },
            {
                title: "Модерен технологичен стек",
                description: "Винаги в крак с най-новите стандарти.",
                bg: "#DEE5FF"
            }
        ]
    }
};
