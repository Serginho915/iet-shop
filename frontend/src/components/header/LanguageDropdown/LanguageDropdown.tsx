"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { IconFlagUK, IconFlagBG } from "@/components/icons";
import styles from "./LanguageDropdown.module.scss";

const flags = {
    en: IconFlagUK,
    bg: IconFlagBG,
};

export const LanguageDropdown = () => {
    const { lang, setLang } = useLanguage();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const other = lang === "en" ? "bg" : "en";
    const CurrentFlag = flags[lang];
    const OtherFlag = flags[other];

    const redirectedPathname = (locale: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        const path = segments.join("/");
        const query = searchParams.toString();
        return query ? `${path}?${query}` : path;
    };

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className={styles.wrapper}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={styles.langFlag}
            >
                <CurrentFlag />
            </button>

            {isOpen && (
                <div className={`${styles.menu} ${styles.right}`}>
                    <button
                        onClick={() => {
                            const newPath = redirectedPathname(other);
                            router.push(newPath);
                            setLang(other);
                            setIsOpen(false);
                        }}
                        className={styles.langOption}
                        title={other === "en" ? "English" : "Български"}
                    >
                        <OtherFlag />
                    </button>
                </div>
            )}
        </div>
    );
};
