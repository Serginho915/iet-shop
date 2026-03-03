"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/header/navbar/navbar";
import { IconBag, IconUser } from "@/components/icons";
import { RequestButton } from "@/components/header/RequestButton/RequestButton";
import { LanguageDropdown } from "@/components/header/LanguageDropdown/LanguageDropdown";
import styles from "./Header.module.scss";

export const Header = () => {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY.current;

            if (currentScrollY < 80) {
                setVisible(true);
            } else {
                setVisible(!scrollingDown);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${visible ? styles.headerVisible : styles.headerHidden}`}>
            <div className={styles.container}>
                <div className={styles.inner}>

                    {/* LOGO + NAV */}
                    <div className={styles.left}>
                        <Link href="/" className={styles.logo}>
                            <span>IOT</span>
                        </Link>

                        <div className={styles.navbarHidden}>
                            <Navbar />
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className={styles.actions}>
                        <div className={styles.userGroup}>
                            <Link href="/cart" className={styles.actionIcon}>
                                <IconBag />
                            </Link>

                            <LanguageDropdown />

                            <Link href="/account" className={styles.actionIcon}>
                                <IconUser />
                            </Link>
                        </div>

                        <RequestButton />
                    </div>
                </div>
            </div>
        </header>
    );
};
