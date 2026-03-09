"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { useTranslate } from "@/lib/useTranslate";
import styles from "../PrivacyPolicyModal/PrivacyPolicyModal.module.scss";

const cookieTranslations = {
    bg: {
        title: "Настройки на бисквитките",
        content: `
            <h3>Използване на бисквитки</h3>
            <p>Нашият уебсайт използва бисквитки (cookies), за да подобри вашето преживяване. Бисквитките са малки текстови файлове, които се запазват на вашето устройство.</p>
            <h3>Необходими бисквитки</h3>
            <p>Тези бисквитки са абсолютно необходими за правилното функциониране на уебсайта. Те не съхраняват никаква лична информация.</p>
            <h3>Аналитични бисквитки</h3>
            <p>Тези бисквитки ни помагат да разберем как посетителите взаимодействат с уебсайта, предоставяйки информация за метрики като брой посетители и процент на отпадане.</p>
        `
    },
    en: {
        title: "Cookie Settings",
        content: `
            <h3>Use of Cookies</h3>
            <p>Our website uses cookies to improve your experience. Cookies are small text files that are stored on your device.</p>
            <h3>Necessary Cookies</h3>
            <p>These cookies are absolutely essential for the website to function properly. They do not store any personal information.</p>
            <h3>Analytical Cookies</h3>
            <p>These cookies help us understand how visitors interact with the website, providing information on metrics such as the number of visitors and bounce rate.</p>
        `
    }
};

interface CookieSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CookieSettingsModal = ({ isOpen, onClose }: CookieSettingsModalProps) => {
    const { t } = useTranslate(cookieTranslations);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={styles.modalBody}
        >
            <div className={styles.content}>
                <h2 className={styles.title}>{t.title}</h2>
                <div
                    className={styles.textBody}
                    dangerouslySetInnerHTML={{ __html: t.content }}
                />
            </div>
        </Modal>
    );
};
