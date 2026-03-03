"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: "left" | "right";
}

const DropdownContext = React.createContext<{ setIsOpen: (val: boolean) => void }>({ setIsOpen: () => { } });

export const Dropdown = ({ trigger, children, align = "left" }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mouseDownHandler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", mouseDownHandler);

        return () => {
            document.removeEventListener("mousedown", mouseDownHandler);
        };
    }, []);



    // Close on scroll to prevent stuck state
    useEffect(() => {
        if (!isOpen) return;

        let lastPos = window.scrollY;
        const handleScroll = () => {
            if (Math.abs(window.scrollY - lastPos) > 10) {
                setIsOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{ setIsOpen }}>
            <div
                ref={ref}
                className={styles.dropdownWrapper}
                onMouseEnter={() => !('ontouchstart' in window) && setIsOpen(true)}
                onMouseLeave={() => !('ontouchstart' in window) && setIsOpen(false)}
            >
                <div
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={styles.trigger}
                >
                    {trigger}
                </div>

                {isOpen && (
                    <div className={`${styles.menu} ${styles[align]}`}>
                        {children}
                    </div>
                )}
            </div>
        </DropdownContext.Provider>
    );
};

export const DropdownItem = ({
    children,
    onClick,
    className = "",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}) => {
    const { setIsOpen } = React.useContext(DropdownContext);
    return (
        <div
            onClick={(e) => {
                if (onClick) onClick();
                setIsOpen(false);
            }}
            className={`${styles.item} ${className}`}
        >
            {children}
        </div>
    );
};


