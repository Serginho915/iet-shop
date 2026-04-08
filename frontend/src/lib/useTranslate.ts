import { useLanguage } from "./LanguageContext";
import type { Lang } from "./LanguageContext";

export function useTranslate<T>(translations: Record<Lang, T>) {
    const { lang } = useLanguage();
    const safeLang: Lang = lang === "bg" ? "bg" : "en";
    return {
        t: translations[safeLang],
        lang: safeLang
    };
}
