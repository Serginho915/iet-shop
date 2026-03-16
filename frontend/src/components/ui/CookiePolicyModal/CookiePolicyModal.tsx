"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { useTranslate } from "@/lib/useTranslate";
import styles from "./CookiePolicyModal.module.scss";

const cookieTranslations = {
    bg: {
        title: "Политика за бисквитки",
        content: `
            <h3>Какво са бисквитките?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <h3>Как ги използваме?</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <h3>Вашият избор</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        `
    },
    en: {
        title: "Cookie Policy",
        content: `
            <h3>What are cookies?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <h3>How do we use them?</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <h3>Your Choice</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        `
    }
};

interface CookiePolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CookiePolicyModal = ({ isOpen, onClose }: CookiePolicyModalProps) => {
    const { t } = useTranslate(cookieTranslations);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={styles.modalBody}
            overlayClassName={styles.overlay}
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
