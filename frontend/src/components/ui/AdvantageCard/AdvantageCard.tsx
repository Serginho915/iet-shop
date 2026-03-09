import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './AdvantageCard.module.scss';

export interface AdvantageCardProps {
    title: string;
    description: string;
    image?: string | StaticImageData;
    bg?: string;
    index?: number;
    style?: React.CSSProperties;
}

export const AdvantageCard = ({ title, description, image, bg, style }: AdvantageCardProps) => {
    const isDark = bg === "#5A55F4";

    return (
        <div
            className={`${styles.card} ${isDark ? styles.dark : ""}`}
            style={{ backgroundColor: bg, ...style }}
        >
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            {image && (
                <div className={styles.imageWrapper}>
                    <Image src={image} alt={title} width={200} height={200} className={styles.image} />
                </div>
            )}
        </div>
    );
};