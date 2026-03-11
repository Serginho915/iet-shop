"use client";

import React from "react";
import Image from "next/image";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from "./HeroSection.module.scss";

// Images from assets/HeroSection
import heroMain from "@/assets/HeroSection/HeroMain.jpg";
import heroGeorge from "@/assets/emojii/GeorgeAvatar.png";
import beginnerFriendly from "@/assets/HeroSection/beginnerFriendly.svg";
import checkLabel from "@/assets/HeroSection/checkLabel.svg";
import student1 from "@/assets/HeroSection/student1.png";
import student2 from "@/assets/HeroSection/student2.png";
import student3 from "@/assets/HeroSection/student3.png";
import student4 from "@/assets/HeroSection/student4.png";
import student5 from "@/assets/HeroSection/student5.png";

export const HeroSection = ({ metadata = {} }: { metadata?: Record<string, unknown> }) => {
  const { t: tr, lang } = useTranslate(translations);

  const getDynamic = (key: string, fallback: string) => {
    const dynamicKey = `${key}_${lang}`;
    const value = metadata[dynamicKey];
    return typeof value === "string" ? value : fallback;
  };

  const expertises = [
    { title: getDynamic("expertiseDesign", tr.expertiseDesign), isBlue: false },
    { title: getDynamic("expertiseMarketing", tr.expertiseMarketing), isBlue: false },
    { title: getDynamic("expertiseProgramming", tr.expertiseProgramming), isBlue: true },
    { title: getDynamic("expertiseRobotics", tr.expertiseRobotics), isBlue: false },
    { title: getDynamic("expertiseGameDev", tr.expertiseGameDev), isBlue: false },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroContentLeft}>
          <h3 className={styles.heroTitle}>
            {getDynamic("heroTitle", tr.heroTitle)}{" "}
            <span className={styles.heroTitleHighlight}>
              {getDynamic("heroTitleHighlight", tr.heroTitleHighlight)}
            </span>
          </h3>

          <p className={styles.heroDescription}>
            {getDynamic("heroDescription", tr.heroDescription)}{" "}
            <span className={styles.heroDescriptionHighlight}>
              {getDynamic("heroDescriptionHighlight", tr.heroDescriptionHighlight)}
            </span>{" "}
            {getDynamic("heroDescriptionEnd", tr.heroDescriptionEnd)}
          </p>
        </div>

        <div className={styles.heroContentRight}>
          <div className={styles.imageWrapper}>
            <div className={styles.codeIcon}>&lt;/&gt;</div>
            <div className={styles.imageContainer}>
              <Image
                src={heroMain} 
                alt="hero-image"
                fill
                className={styles.heroImage}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.expertiseSection}>
        <div className={styles.statsBlock}>
          <div className={styles.georgeBlock}>
            <Image src={heroGeorge} alt="George" width={116} height={156} className={styles.georgeAvatar} />
            <p className={styles.georgeChat}>
              {getDynamic("georgeChat", tr.georgeChat)}
            </p>
          </div>

          <div className={styles.statsRightInner}>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.count}>100%</span>
                <span className={styles.label}>
                  <Image src={beginnerFriendly} alt="beginner friendly" width={20} height={20} /> {getDynamic("beginnerFriendly", tr.beginnerFriendly)}
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.count}>900+</span>
                <div className={styles.label}>
                  <Image src={checkLabel} alt="check" width={20} height={20} />
                  <p className={styles.coursesDeliveredText}>{getDynamic("coursesDelivered", tr.coursesDelivered)}</p>
                </div>
              </div>
            </div>

            <div className={styles.studentsInfo}>
              <div className={styles.studentAvatars}>
                {[student1, student2, student3, student4, student5].map((s, i) => (
                  <Image key={i} src={s} alt="student" width={40} height={40} />
                ))}
              </div>
              <span className={styles.studentsText}>
                1500+ {getDynamic("studentsCompleted", tr.studentsCompleted)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.expertiseList}>
          <h4 className={styles.expertiseTitle}>{getDynamic("expertiseTitle", tr.expertiseTitle)}</h4>
          {expertises.map((exp, i) => (
            <div
              key={i}
              className={`${styles.expertisePill} ${exp.isBlue ? styles.active : ""}`}
            >
              &lt; {exp.title} &gt;
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
