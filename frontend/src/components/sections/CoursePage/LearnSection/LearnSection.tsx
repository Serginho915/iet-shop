"use client";

import React from "react";
import Image from "next/image";
import { Course } from "@/lib/api";
import { useTranslate } from "@/lib/useTranslate";
import { Button } from "@/components/ui/Button/Button";
import { translations } from "./translations";
import styles from "./LearnSection.module.scss";

// Asset imports
import humanImg from "@/assets/Learnsection/human.png";
import likeImg from "@/assets/Learnsection/like.png";
import cursorSvg from "@/assets/Learnsection/cursor.svg";

interface LearnSectionProps {
  course: Course;
}

export const LearnSection = ({ course }: LearnSectionProps) => {
  const { t, lang } = useTranslate(translations);

  const instruments = course.instruments || [];
  const outcomes = course.outcomes || [];

  return (
    <section className={styles.learnSection}>
      {/* ── Part 1: Instruments ──────────────────────────────────────────── */}
      <div className={styles.instrumentsBlock}>
        <div className={styles.instrumentsHeader}>
          <h2 className={styles.instrumentsTitle}>{t.instrumentsTitle}</h2>
          <Button variant="primary" size="lg" rounded="xl">
            {t.leaveRequest}
          </Button>
        </div>

        <div className={styles.instrumentsRow}>
          {instruments.map((item: any, index: number) => {
            const name = typeof item.name === 'object' && item.name
              ? (item.name[lang] || item.name.en || item.name.bg || "")
              : (item.name_en || item.name_bg || item.name || "");
            return (
              <div key={index} className={styles.instrumentItem}>
                <div className={styles.instrumentIcon}>
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt={String(name || "")}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <div className={styles.instrumentIconPlaceholder} />
                  )}
                </div>
                <span className={styles.instrumentName}>{String(name || "")}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Part 2: Outcomes ─────────────────────────────────────────────── */}
      <div className={styles.outcomesBlock}>
        <h3 className={styles.outcomesTitle}>{t.outcomeTitle}</h3>

        <div className={styles.outcomesLayout}>
          {/* Left – photo */}
          <div className={styles.photoBox}>
            <Image
              src={humanImg}
              alt="Course result"
              width={523}
              height={612}
              className={styles.humanImg}
              priority
            />
            <Image
              src={likeImg}
              alt="Like"
              width={80}
              height={80}
              className={styles.likeImg}
            />
            <Image
              src={likeImg}
              alt="Like"
              width={80}
              height={80}
              className={styles.likeImg + " " + styles.likeImg2}
            />
          </div>

          {/* Right – 2-column grid */}
          <div className={styles.cardsGrid}>
            {outcomes.map((item: any, index: number) => {
              const text = typeof item === 'object' && item
                ? (item[lang] || item.text || item.text_en || item.text_bg || "")
                : item;
              return (
                <div
                  key={index}
                  className={`${styles.outcomeCard} ${index === 0 ? styles.highlighted : ""}`}
                >
                  <p className={styles.cardText}>{String(text || "")}</p>
                  <div className={styles.cursorWrapper}>
                    <Image
                      src={cursorSvg}
                      alt="cursor"
                      width={16}
                      height={24}
                      className={styles.cursorIcon}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
