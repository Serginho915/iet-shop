import React from "react";
import styles from "./SectionTitle.module.scss";

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
    as?: "h1" | "h2" | "h3";
}

export const SectionTitle = ({ children, className, as: Tag = "h2" }: SectionTitleProps) => {
    return (
        <Tag className={`${styles.title} ${className ?? ""}`}>
            {children}
        </Tag>
    );
};
