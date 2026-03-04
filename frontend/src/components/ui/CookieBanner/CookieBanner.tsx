"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "./translations";
import styles from "./CookieBanner.module.scss";

export const CookieBanner = () => {
    const { lang } = useLanguage();
    const t = translations[lang];
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = getCookie("cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const setCookie = (name: string, value: string, days: number) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const getCookie = (name: string) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    const handleAccept = () => {
        setCookie("cookie-consent", "accepted", 365);
        setIsVisible(false);
    };

    const handleReject = () => {
        setCookie("cookie-consent", "rejected", 365);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.bannerWrapper}>
            <div className={styles.inner}>
                <p className={styles.message}>{t.message}</p>
                <div className={styles.buttons}>
                    <button onClick={handleReject} className={styles.rejectBtn}>
                        {t.reject}
                    </button>
                    <button onClick={handleAccept} className={styles.acceptBtn}>
                        {t.accept}
                    </button>
                </div>
            </div>
        </div>
    );
};
