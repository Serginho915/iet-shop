"use client";

import React, { useState, useEffect } from "react";
import { useTranslate } from "@/lib/useTranslate";
import { translations, CookieTranslations } from "./translations";
import styles from "./CookieBanner.module.scss";
import { Button } from "@/components/ui/Button/Button";

type ConsentChoices = {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
};

export const CookieBanner = () => {
    const { t, lang } = useTranslate<CookieTranslations>(translations);
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [choices, setChoices] = useState<ConsentChoices>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    const saveConsent = (newChoices: ConsentChoices) => {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                window.localStorage.setItem("cookie-consent", JSON.stringify(newChoices));
            }
        } catch (e) {
            console.error("CookieBanner: Failed to save consent", e);
        }
        setIsVisible(false);

        // Apply choice to Google Analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                'analytics_storage': newChoices.analytics ? 'granted' : 'denied',
                'ad_storage': newChoices.marketing ? 'granted' : 'denied'
            });
        }
    };

    useEffect(() => {
        try {
            if (typeof window === "undefined" || !window.localStorage) {
                setIsVisible(true);
                return;
            }

            const consent = window.localStorage.getItem("cookie-consent");
            if (!consent) {
                const timer = setTimeout(() => setIsVisible(true), 1500);
                return () => clearTimeout(timer);
            } else {
                // If already consented
                try {
                    const parsed = JSON.parse(consent);
                    if (typeof parsed === 'object') {
                        setChoices(parsed);

                        if ((window as any).gtag) {
                            (window as any).gtag('consent', 'update', {
                                'analytics_storage': parsed.analytics ? 'granted' : 'denied',
                                'ad_storage': parsed.marketing ? 'granted' : 'denied'
                            });
                        }
                    }
                } catch (e) {
                    if (consent === 'accepted') {
                        const allIn = { necessary: true, analytics: true, marketing: true };
                        setChoices(allIn);
                        saveConsent(allIn);
                    }
                }
            }
        } catch (e) {
            console.error("CookieBanner: LocalStorage access failed", e);
            setIsVisible(true); // Fallback: show banner if storage is blocked
        }
    }, []);

    useEffect(() => {
        const handleOpen = () => {
            setIsVisible(true);
            setShowSettings(true);
        };

        window.addEventListener("open-cookie-banner", handleOpen);
        return () => window.removeEventListener("open-cookie-banner", handleOpen);
    }, []);

    const handleAcceptAll = () => {
        const allIn = { necessary: true, analytics: true, marketing: true };
        setChoices(allIn);
        saveConsent(allIn);
    };

    const handleRejectAll = () => {
        const allOut = { necessary: true, analytics: false, marketing: false };
        setChoices(allOut);
        saveConsent(allOut);
    };

    const handleSaveChoices = () => {
        saveConsent(choices);
    };

    const toggleChoice = (key: keyof ConsentChoices) => {
        if (key === 'necessary') return;
        setChoices(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (!isVisible) return null;

    return (
        <div className={styles.bannerWrapper}>
            <div className={styles.banner}>
                {!showSettings ? (
                    <div className={styles.mainView}>
                        <div className={styles.content}>
                            <h3 className={styles.title}>{t.title}</h3>
                            <div className={styles.text}>
                                <p className={styles.textDesc}>
                                    {t.description}{" "}
                                    <button
                                        type="button"
                                        className={styles.link}
                                        onClick={() => window.dispatchEvent(new CustomEvent("open-cookie-policy"))}
                                    >
                                        {t.policyLink}
                                    </button>
                                </p>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <Button
                                variant="outline"
                                size="md"
                                rounded="xl"
                                onClick={() => setShowSettings(true)}
                                className={styles.actionBtn}
                            >
                                {t.settings}
                            </Button>
                            <Button
                                variant="dark-outline"
                                size="md"
                                rounded="xl"
                                onClick={handleRejectAll}
                                className={styles.actionBtn}
                            >
                                {t.reject}
                            </Button>
                            <Button
                                variant="primary"
                                size="md"
                                rounded="xl"
                                onClick={handleAcceptAll}
                                className={styles.actionBtn}
                            >
                                {t.accept}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.settingsView}>
                        <div className={styles.content}>
                            <h3 className={styles.title}>{t.settings}</h3>
                            <div className={styles.settingsContainer}>
                                {/* Necessary */}
                                <div className={styles.categoryItem}>
                                    <div className={styles.categoryInfo}>
                                        <h4>{t.categories.necessary.title}</h4>
                                        <p>{t.categories.necessary.desc}</p>
                                    </div>
                                    <label className={styles.categoryToggle}>
                                        <input type="checkbox" checked={choices.necessary} disabled />
                                        <span></span>
                                    </label>
                                </div>
                                {/* Analytics */}
                                <div className={styles.categoryItem}>
                                    <div className={styles.categoryInfo}>
                                        <h4>{t.categories.analytics.title}</h4>
                                        <p>{t.categories.analytics.desc}</p>
                                    </div>
                                    <label className={styles.categoryToggle}>
                                        <input
                                            type="checkbox"
                                            checked={choices.analytics}
                                            onChange={() => toggleChoice('analytics')}
                                        />
                                        <span></span>
                                    </label>
                                </div>
                                {/* Marketing */}
                                <div className={styles.categoryItem}>
                                    <div className={styles.categoryInfo}>
                                        <h4>{t.categories.marketing.title}</h4>
                                        <p>{t.categories.marketing.desc}</p>
                                    </div>
                                    <label className={styles.categoryToggle}>
                                        <input
                                            type="checkbox"
                                            checked={choices.marketing}
                                            onChange={() => toggleChoice('marketing')}
                                        />
                                        <span></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.actions} ${styles.settingsActions}`}>
                            <Button
                                variant="outline"
                                size="md"
                                rounded="xl"
                                onClick={() => setShowSettings(false)}
                                className={styles.actionBtn}
                            >
                                ←
                            </Button>
                            <Button
                                variant="dark-outline"
                                size="md"
                                rounded="xl"
                                onClick={handleSaveChoices}
                                className={styles.actionBtn}
                            >
                                {t.save}
                            </Button>
                            <Button
                                variant="primary"
                                size="md"
                                rounded="xl"
                                onClick={handleAcceptAll}
                                className={styles.actionBtn}
                            >
                                {t.accept}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
