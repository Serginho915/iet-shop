"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { useTranslate } from "@/lib/useTranslate";
import styles from "./PrivacyPolicyModal.module.scss";

const privacyTranslations = {
    bg: {
        title: "Политика за поверителност",
        content: `
            <h3>1. Въведение</h3>
            <p>Тази Политика за поверителност описва как събираме, използваме и защитаваме вашата лична информация.</p>
            <h3>2. Събиране на данни</h3>
            <p>Ние събираме информация, която ни предоставяте при попълване на форми на нашия сайт.</p>
            <h3>3. Използване на данни</h3>
            <p>Вашите данни се използват изключително за обратна връзка и организация на курсовете.</p>
        `
    },
    en: {
        title: "Privacy Policy",
        content: `
            <h3>1. Introduction</h3>
            <p>This Privacy Policy describes how we collect, use, and protect your personal information.</p>
            <h3>2. Data Collection</h3>
            <p>We collect information that you provide to us when filling out forms on our site.</p>
            <h3>3. Data Usage</h3>
            <p>Your data is used exclusively for feedback and course organization purposes.</p>
        `
    }
};

interface PrivacyPolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
    const { t } = useTranslate(privacyTranslations);

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
