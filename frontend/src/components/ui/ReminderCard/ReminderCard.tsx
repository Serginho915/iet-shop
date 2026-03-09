import Image, { StaticImageData } from 'next/image';
import reminderDefault from '@/assets/emojii/reminderMascot.png';
import styles from './ReminderCard.module.scss';

interface ReminderCardProps {
    title: string;
    text: string;
    className?: string;
    mascotSrc?: StaticImageData;
    mascotWidth?: number;
    mascotHeight?: number;
}

export const ReminderCard = ({
    title,
    text,
    className,
    mascotSrc,
    mascotWidth = 123,
    mascotHeight = 154
}: ReminderCardProps) => {
    const icon = mascotSrc || reminderDefault;

    return (
        <div className={`${styles.card} ${className || ''}`}>
            <div className={styles.imageWrapper}>
                <Image src={icon} alt="Reminder Mascot" width={mascotWidth} height={mascotHeight} />
            </div>
            <div className={styles.content}>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    );
};
