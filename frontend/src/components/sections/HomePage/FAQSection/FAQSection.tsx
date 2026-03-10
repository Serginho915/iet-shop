"use client";

import React, { useState } from "react";
import styles from "./FAQSection.module.scss";
import { useTranslate } from "@/lib/useTranslate";
import { translations, translationsTitle } from "./translations";
import { ReminderCard } from "@/components/ui/ReminderCard/ReminderCard";
import gladAsked from "@/assets/emojii/emojii10.png";

export const FAQSection = () => {
  const { t: tr } = useTranslate(translations);
  const { t: titleTr } = useTranslate(translationsTitle);

  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setActiveFAQ((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2>{titleTr?.title}</h2>
        <ul className={styles.faqList}>
          {tr.faqs.map((faq) => (
            <li key={faq.id} className={styles.faqItemWrapper}>
              <div className={styles.faqItem}>
                <div
                  className={`${styles.faqQuestion} ${activeFAQ === faq.id ? styles.active : ""}`}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span>{faq.question}</span>
                  <div className={styles.toggleArrow}></div>
                </div>
                <div className={`${styles.answerWrapper} ${activeFAQ === faq.id ? styles.open : ""}`}>
                  <div className={styles.answerContent}>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.bottomContent}>
          <ReminderCard
            title={titleTr?.reminderTitle}
            text={titleTr?.reminderText}
            mascotSrc={gladAsked}
            mascotWidth={210}
            mascotHeight={210}
          />
        </div>
      </div>
    </section>
  );
};
