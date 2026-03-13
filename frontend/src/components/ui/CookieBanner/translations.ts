import { Lang } from "@/lib/translations";

export type CookieTranslations = {
    title: string;
    description: string;
    accept: string;
    reject: string;
    settings: string;
    save: string;
    policyLink: string;
    categories: {
        necessary: { title: string; desc: string };
        analytics: { title: string; desc: string };
        marketing: { title: string; desc: string };
    };
};

export const translations: Record<Lang, CookieTranslations> = {
    en: {
        title: "We Value Your Privacy",
        description: "We use cookies to improve your experience, analyze site traffic, and support our marketing efforts. By clicking 'Accept All', you consent to our use of cookies.",
        accept: "Accept All",
        reject: "Reject",
        settings: "Settings",
        save: "Save Choices",
        policyLink: "Cookie Policy",
        categories: {
            necessary: {
                title: "Strictly Necessary",
                desc: "Essential for the website to function properly. Cannot be disabled.",
            },
            analytics: {
                title: "Analytics",
                desc: "Help us understand how visitors interact with the website to improve user experience.",
            },
            marketing: {
                title: "Marketing",
                desc: "Used to track visitors across websites to deliver relevant advertisements.",
            },
        },
    },
    bg: {
        title: "Ние ценим вашата поверителност",
        description: "Използваме бисквитки в съответствие с изискванията на Регламент (ЕС) 2016/679 на Европейския парламент и на Съвета от 27 април 2016 г. (GDPR) относно защитата на физическите лица във връзка с обработването на лични данни. С кликване върху „Приемам всички“, вие се съгласявате с използването на бисквитки от наша страна.",
        accept: "Приемам всички",
        reject: "Отказвам",
        settings: "Настройки",
        save: "Запази избора",
        policyLink: "Политика за бисквитки",
        categories: {
            necessary: {
                title: "Строго необходими",
                desc: "От съществено значение за правилната работа на уебсайта. Не могат да бъдат деактивирани.",
            },
            analytics: {
                title: "Аналитични",
                desc: "Помагат ни да разберем как посетителите взаимодействат с уебсайта, за да подобрим изживяването.",
            },
            marketing: {
                title: "Маркетингови",
                desc: "Използват се за проследяване на посетители през уебсайтове с цел показване на подходящи реклами.",
            },
        },
    },
};
