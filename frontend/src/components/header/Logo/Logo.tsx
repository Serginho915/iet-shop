"use client";

import React from "react";
import Image from "next/image";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import logo from "@/assets/logo-iet.jpg";
import styles from "./Logo.module.scss";

interface LogoProps {
    onClick?: () => void;
    className?: string;
}

export const Logo = ({ onClick, className }: LogoProps) => {
    return (
        <Link href="/" className={`${styles.logo} ${className || ""}`} onClick={onClick}>
            <Image
                src={logo}
                className={styles.logoImage}
                alt="IET Shop Logo"
                priority
            />
        </Link>
    );
};
