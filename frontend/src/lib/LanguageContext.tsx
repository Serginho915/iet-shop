"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "en" | "bg";

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "en",
    setLang: () => { },
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({
    children,
    initialLang = "bg"
}: {
    children: React.ReactNode;
    initialLang?: Lang;
}) => {
    const [lang, setLang] = useState<Lang>(initialLang);
    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};
