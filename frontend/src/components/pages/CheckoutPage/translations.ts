import type { Lang } from "@/lib/LanguageContext";

export type CheckoutTranslations = {
    breadcrumbsCourses: string;
    breadcrumbsCheckout: string;
    title: string;
    startLabel: string;
    priceLabel: string;
    currency: string;
    currencyBgn: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    privacyPrefix: string;
    privacyLink: string;
    privacySuffix: string;
    payNowButton: string;
    leaveRequestButton: string;
    errorName: string;
    errorEmail: string;
    errorPhone: string;
    errorPrivacy: string;
    successMessage: string;
};

export const translations: Record<Lang, CheckoutTranslations> = {
    en: {
        breadcrumbsCourses: "Courses",
        breadcrumbsCheckout: "Checkout",
        title: "Book a Spot",
        startLabel: "Start",
        priceLabel: "Price",
        currency: "€",
        currencyBgn: "лв",
        namePlaceholder: "Name",
        emailPlaceholder: "Email",
        phonePlaceholder: "Phone",
        privacyPrefix: "I agree to the ",
        privacyLink: "Privacy Policy",
        privacySuffix: " and personal data processing.",
        payNowButton: "Pay Now",
        leaveRequestButton: "Leave Request",
        errorName: "Please enter your name",
        errorEmail: "Please enter a valid email",
        errorPhone: "Please enter a valid phone number",
        errorPrivacy: "You must agree to the privacy policy",
        successMessage: "Thank you! Your request has been received.",
    },
    bg: {
        breadcrumbsCourses: "Курсове",
        breadcrumbsCheckout: "Чекаут",
        title: "Запишете се",
        startLabel: "Начало",
        priceLabel: "Цена",
        currency: "€",
        currencyBgn: "лв",
        namePlaceholder: "Име",
        emailPlaceholder: "Имейл",
        phonePlaceholder: "Телефон",
        privacyPrefix: "Съгласен съм с ",
        privacyLink: "Политиката за поверителност",
        privacySuffix: " и обработката на лични данни.",
        payNowButton: "Плати сега",
        leaveRequestButton: "Остави запитване",
        errorName: "Моля, въведете вашето име",
        errorEmail: "Моля, въведете валиден имейл",
        errorPhone: "Моля, въведете валиден телефонен номер",
        errorPrivacy: "Трябва да се съгласите с политиката за поверителност",
        successMessage: "Благодарим ви! Вашата заявка беше получена.",
    },
};
