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
    paymentError: string;
    successMessage: string;
    loadingLabel: string;
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
        phonePlaceholder: "XXXXXXX",
        privacyPrefix: "I agree to the ",
        privacyLink: "Privacy Policy",
        privacySuffix: " and personal data processing.",
        payNowButton: "Pay Now",
        leaveRequestButton: "Leave Request",
        errorName: "Please enter your name",
        errorEmail: "Please enter a valid email",
        errorPhone: "Please enter 7 digits after +359.",
        errorPrivacy: "You must agree to the privacy policy",
        paymentError: "Unable to start payment. Please try again.",
        successMessage: "Your request has been successfully sent! We will contact you soon.",
        loadingLabel: "Loading course details...",
    },
    bg: {
        breadcrumbsCourses: "Курсове",
        breadcrumbsCheckout: "Количка",
        title: "Оформяне на поръчка",
        startLabel: "Начало",
        priceLabel: "Цена",
        currency: "€",
        currencyBgn: "лв",
        namePlaceholder: "Име",
        emailPlaceholder: "Имейл",
        phonePlaceholder: "XXXXXXX",
        privacyPrefix: "Съгласен съм с ",
        privacyLink: "общи условия",
        privacySuffix: " и обработка на лични данни.",
        payNowButton: "Плати сега",
        leaveRequestButton: "Остави заявка",
        errorName: "Моля, въведете вашето име.",
        errorEmail: "Моля, въведете валиден имейл.",
        errorPhone: "Моля, въведете 7 цифри след +359.",
        errorPrivacy: "Трябва да се съгласите с политиката.",
        paymentError: "Не успяхме да стартираме плащането. Опитайте отново.",
        successMessage: "Вашата заявка е изпратена успешно! Ще се свържем с вас скоро.",
        loadingLabel: "Зареждане на детайли...",
    },
};
