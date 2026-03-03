"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Select.module.scss";

interface Option {
    id: string;
    name: string;
}

interface SelectProps {
    options: Option[];
    value: string;
    onChange: (id: string) => void;
    placeholder?: string;
    className?: string;
}

export const Select = ({ options, value, onChange, placeholder, className }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.id === value);

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
        <div ref={ref} className={`${styles.selectWrapper} ${className || ""}`}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
            >
                <span className={styles.value}>
                    {selectedOption ? selectedOption.name : placeholder}
                </span>
                <span className={styles.arrow}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </span>
            </button>

            {isOpen && (
                <div className={styles.menu}>
                    {options.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            className={`${styles.item} ${value === option.id ? styles.selected : ""}`}
                            onClick={() => {
                                onChange(option.id);
                                setIsOpen(false);
                            }}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
