"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from './JourneySection.module.scss';

import mascot from '@/assets/Journey/mascot.png';
import img1 from '@/assets/Journey/classroom.jpg';
import img2 from '@/assets/Journey/kids.jpg';
import img3 from '@/assets/Journey/lesson.jpg';
import img4 from '@/assets/Journey/working.jpg';

export const JourneySection = () => {
    const { t } = useTranslate(translations);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className={styles.journeySection}>
            <div className={styles.container}>
                <div className={styles.layout}>
                    {/* Left Column */}
                    <div className={styles.infoSide}>
                        <h2 className={styles.title}>
                            <span className={styles.highlight}>{t.titleHighlight}</span>
                            {t.titleSuffix}
                        </h2>

                        <div className={styles.mascotWrapper}>
                            <Image src={mascot} alt="Mascot" className={styles.mascot} priority />
                        </div>

                        <p className={styles.description}>
                            {t.description}
                            <span className={styles.highlight}>{t.descriptionHighlight}</span>
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className={styles.visualSide}>
                        <div className={styles.imageGrid}>
                            <div className={styles.imageBox}>
                                <Image src={img1} alt="Classroom" className={styles.gridImage} />
                            </div>
                            <div className={styles.imageBox}>
                                <Image src={img2} alt="Kids" className={styles.gridImage} />
                            </div>
                            <div className={styles.imageBox}>
                                <Image src={img3} alt="Lesson" className={styles.gridImage} />
                            </div>
                            <div className={styles.imageBox}>
                                <Image src={img4} alt="Working" className={styles.gridImage} />
                            </div>
                        </div>

                        <div className={styles.videoWrapper} onClick={togglePlay}>
                            <video
                                ref={videoRef}
                                className={styles.video}
                                src="/assets/Journey/Info-video.mov"
                                playsInline
                            />
                            {!isPlaying && (
                                <div className={styles.playOverlay}>
                                    <div className={styles.playButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63" fill="none">
                                            <g clipPath="url(#clip0_368_1721)">
                                                <path d="M62.7115 27.2474C62.1518 22.8228 60.5308 18.5991 57.9865 14.9361C55.2969 10.8433 51.6848 7.43827 47.4405 4.99469C43.1961 2.55111 38.4378 1.13706 33.5478 0.866139C28.6236 0.600744 23.7034 1.45492 19.1568 3.36448C14.6103 5.27403 10.5557 8.18929 7.29777 11.8911C3.59909 16.2933 1.20219 21.6402 0.37672 27.3304C-0.448748 33.0206 0.329971 38.8282 2.62527 44.0999C6.77277 53.4449 16.0128 60.7686 29.5578 62.0024C31.9857 62.2121 34.4273 62.2121 36.8553 62.0024C39.3105 61.7945 41.7331 61.3012 44.074 60.5324C44.3003 60.4593 44.4882 60.2993 44.5965 60.0876C44.7048 59.8759 44.7246 59.6299 44.6515 59.4036C44.5784 59.1774 44.4184 58.9894 44.2067 58.8811C43.9951 58.7728 43.749 58.753 43.5228 58.8261C41.3222 59.5139 39.0497 59.9455 36.7503 60.1124C34.4227 60.2679 32.0859 60.2152 29.7678 59.9549C17.2203 58.6161 8.76777 51.7649 5.04027 43.0499C3.02338 38.2276 2.39217 32.9381 3.21764 27.7766C4.0431 22.6151 6.2925 17.7864 9.71277 13.8336C12.657 10.5121 16.3062 7.89028 20.3937 6.15993C24.4811 4.42957 28.9036 3.63435 33.3378 3.83239C37.8141 4.02492 42.1843 5.25652 46.1025 7.42974C50.0206 9.60296 53.3793 12.6582 55.9128 16.3536C58.3069 19.6725 59.8729 23.5155 60.4803 27.5624C61.1026 31.6503 60.9423 35.8193 60.0078 39.8474C59.5486 42.2428 58.7901 44.5711 57.7503 46.7774C56.6425 48.8892 55.028 50.6931 53.0515 52.0274C52.9647 52.0854 52.8903 52.1602 52.8326 52.2473C52.775 52.3344 52.7352 52.4321 52.7157 52.5347C52.6961 52.6373 52.6972 52.7427 52.7188 52.8449C52.7404 52.9471 52.7821 53.044 52.8415 53.1299C52.9632 53.2997 53.1455 53.4163 53.3508 53.4554C53.556 53.4945 53.7684 53.4531 53.944 53.3399C55.7266 52.173 57.261 50.6654 58.459 48.9036C60.1115 46.2416 61.3092 43.3229 62.0028 40.2674C63.0679 36.0124 63.3084 31.5928 62.7115 27.2474Z" fill="#FFFAFA" />
                                                <path d="M22.8266 26.838C22.6168 26.8371 22.4143 26.9147 22.2588 27.0556C22.1034 27.1964 22.0063 27.3904 21.9866 27.5992L21.1466 37.863C20.8696 39.6166 20.9862 41.41 21.4878 43.113C21.7797 43.6676 22.2603 44.0995 22.8429 44.3306C23.4254 44.5617 24.0714 44.5767 24.6641 44.373C28.0831 42.7466 31.2917 40.7104 34.2191 38.3092C35.8324 37.1075 37.3189 35.7442 38.6553 34.2405C39.1817 33.6844 39.545 32.9942 39.7053 32.2455C39.7476 31.5333 39.5639 30.8259 39.1803 30.2242C38.2494 28.8238 37.1373 27.5528 35.8728 26.4442C32.517 23.2086 28.6834 20.5082 24.5066 18.438C24.082 18.3203 23.6285 18.3687 23.2384 18.5736C22.8482 18.7784 22.5508 19.1241 22.4066 19.5405C21.9695 21.201 21.8625 22.9312 22.0916 24.633C22.0983 24.7503 22.1281 24.8651 22.1792 24.9708C22.2304 25.0765 22.3019 25.1711 22.3897 25.2492C22.4775 25.3272 22.5798 25.3872 22.6908 25.4256C22.8018 25.464 22.9193 25.4801 23.0366 25.473C23.2757 25.4594 23.5 25.3531 23.6618 25.1765C23.8236 25 23.9101 24.7673 23.9028 24.528C23.833 23.3794 23.8858 22.2266 24.0603 21.0892C24.0971 20.9066 24.1589 20.7299 24.2441 20.5642C26.7744 22.0268 29.1189 23.7896 31.2266 25.8142C32.8616 27.2491 34.3801 28.8115 35.7678 30.4867C36.1222 30.8798 36.4552 31.2916 36.7653 31.7205V31.9042C36.5816 32.1142 36.2403 32.3767 35.9778 32.6392C34.8608 33.8925 33.6593 35.0678 32.3816 36.1567C30.7278 37.4955 28.8903 38.7817 27.3416 39.963C26.3499 40.7443 25.2864 41.4299 24.1653 42.0105C24.0078 42.0105 23.8766 42.1942 23.7716 42.0105C23.611 41.7588 23.5204 41.4688 23.5091 41.1705C23.4529 40.095 23.4529 39.0173 23.5091 37.9417L23.7191 27.678C23.7234 27.562 23.7028 27.4464 23.6587 27.339C23.6147 27.2316 23.5481 27.1349 23.4636 27.0553C23.3791 26.9757 23.2785 26.9152 23.1686 26.8777C23.0587 26.8402 22.9421 26.8267 22.8266 26.838Z" fill="#FFFAFA" />
                                                <path d="M30.6348 32.4448V32.5761V32.7336V32.5498C30.6348 32.4973 30.6873 32.4711 30.6348 32.4448Z" fill="#FFFAFA" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_368_1721">
                                                    <rect width="63" height="63" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
