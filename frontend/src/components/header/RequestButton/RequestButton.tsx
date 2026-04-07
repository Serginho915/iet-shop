"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/Button/Button";
import { translations } from "./translations";
import styles from "./RequestButton.module.scss";

export const RequestButton = () => {
    const router = useRouter();
    const { lang } = useLanguage();
    const tr = translations[lang] ?? translations.bg;

    const handleClick = () => {
        const el = document.getElementById("consultation");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        } else {
            // Fallback for subpages
            router.push(`/${lang}/#consultation`);
        }
    };

    return (
        <div className={styles.wrapper}>
            <Button
                variant="primary"
                size="lg"
                rounded="xl"
                onClick={handleClick}
            >
                {tr.leaveRequest}
            </Button>
        </div>
    );
};
