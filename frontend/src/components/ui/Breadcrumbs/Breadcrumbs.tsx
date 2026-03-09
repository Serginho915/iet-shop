"use client";

import React from 'react';
import Link from 'next/link';
import styles from './Breadcrumbs.module.scss';
import { useTranslate } from '@/lib/useTranslate';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const translations = {
    en: { home: 'Home' },
    bg: { home: 'Начало' }
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    const { t } = useTranslate(translations);

    return (
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <ol className={styles.list}>
                <li className={styles.item}>
                    <Link href="/" className={styles.link}>
                        {t.home}
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className={styles.item}>
                        <span className={styles.separator}>/</span>
                        {item.href ? (
                            <Link href={item.href} className={styles.link}>
                                {item.label}
                            </Link>
                        ) : (
                            <span className={styles.current}>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
