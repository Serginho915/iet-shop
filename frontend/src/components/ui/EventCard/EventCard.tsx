import React, { useState } from "react";
import styles from "./EventCard.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { IconClock, IconLocation } from "@/components/icons";
import Image from "next/image";

import defaultEventImg from "@/assets/event.jpg";

interface EventCardProps {
    title: string;
    date: string;
    tags: string[];
    location: string;
    joinBtnText: string;
    description?: string;
    image1?: string;
    image2?: string;
    onJoin?: () => void;
    image?: string;
}

export const EventCard = ({
    title,
    date,
    tags,
    location,
    joinBtnText,
    description,
    image1,
    image2,
    onJoin,
}: EventCardProps) => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        if (description) {
            setShowDescription((prev) => !prev);
        }
    };

    return (
        // Добавляем onClick здесь. cursor: pointer добавит наглядности.
        <div
            className={`${styles.card} ${showDescription ? styles.opened : ""}`}
            onClick={toggleDescription}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.left}>
                <div className={styles.avatars}>
                    {image1 && image2 ? (
                        <>
                            <div className={styles.avatar}>
                                <Image src={image1} alt="Event Image 1" width={52} height={51} className={styles.img} />
                            </div>
                            <div className={styles.avatar}>
                                <Image src={image2} alt="Event Image 2" width={52} height={51} className={styles.img} />
                            </div>
                        </>
                    ) : (image1 || image2 || !image1 && !image2) ? (
                        <div
                            className={styles.avatar}
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                position: 'absolute',
                                width: '72px',
                                height: '70px',
                                borderRadius: '12px'
                            }}
                        >
                            <Image
                                src={image1 || image2 || defaultEventImg}
                                alt="Event Image"
                                width={72}
                                height={70}
                                className={styles.img}
                            />
                        </div>
                    ) : null}
                </div>
            </div>

            <div className={styles.middle}>
                <h4 className={styles.title}>{title}</h4>

                <div className={`${styles.description} ${showDescription ? styles.active : ""}`}>
                    <div className={styles.descriptionInner}>
                        <p className={styles.descriptionText}>{description}</p>
                    </div>
                </div>
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
                    onClick={(e) => {
                        e.stopPropagation();
                        onJoin?.();
                    }}
                >
                    {joinBtnText}
                </Button>
            </div>
        </div>
    );
};