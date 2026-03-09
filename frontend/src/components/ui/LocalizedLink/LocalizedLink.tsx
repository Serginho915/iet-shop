"use client";

import Link, { LinkProps } from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import React from "react";

interface LocalizedLinkProps extends LinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
    children: React.ReactNode;
}

export const LocalizedLink = ({ href, children, ...props }: LocalizedLinkProps) => {
    const { lang } = useLanguage();

    // Handle string hrefs
    let localizedHref = href;
    if (typeof href === 'string') {
        const isInternal = href.startsWith('/') && !href.startsWith('/en') && !href.startsWith('/bg');
        if (isInternal) {
            localizedHref = `/${lang}${href === '/' ? '' : href}`;
        }
    }

    return (
        <Link href={localizedHref} {...props}>
            {children}
        </Link>
    );
};
