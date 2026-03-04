import React from 'react';
import styles from './EventCard.module.scss';
import { Button } from '@/components/ui/Button/Button';
import { IconClock, IconLocation } from '@/components/icons';

interface EventCardProps {
    title: string;
    date: string;
    tags: string[];
    location: string;
    joinBtnText: string;
    onJoin?: () => void;
    image?: any; // For avatars
}

export const EventCard = ({ title, date, tags, location, joinBtnText, onJoin }: EventCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <div className={styles.avatars}>
                    <div className={styles.avatar}>
                        <div className={styles.imgPlaceholder} />
                    </div>
                    <div className={styles.avatar}>
                        <div className={styles.imgPlaceholder} />
                    </div>
                </div>
            </div>

            <div className={styles.middle}>
                <h4 className={styles.title}>{title}</h4>
                <div className={styles.infoRow}>
                    <div className={styles.tags}>
                        {tags.map((tag, idx) => (
                            <span key={idx} className={styles.tag}>{tag}</span>
                        ))}
                        <span className={styles.tag}>
                            <IconLocation className={styles.icon} /> {location}
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.dateRow}>
                    <IconClock className={styles.icon} />
                    <span className={styles.date}>{date}</span>
                </div>
                <Button
                    variant="primary"
                    rounded="full"
                    className={styles.joinBtn}
                    onClick={onJoin}
                >
                    {joinBtnText}
                </Button>
            </div>
        </div>
    );
};
