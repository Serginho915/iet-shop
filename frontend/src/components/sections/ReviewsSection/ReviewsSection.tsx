"use client";
import React, { useState, useEffect } from "react";
import { ReviewCard } from "@/components/ui/ReviewCard/ReviewCard";
import { ReminderCard } from "@/components/ui/ReminderCard/ReminderCard";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from "./ReviewsSection.module.scss";

function getSlidesPerView(): number {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export const ReviewsSection = () => {
  const { t } = useTranslate(translations);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const totalSteps = t.reviews.length;

  useEffect(() => {
    const update = () => {
      const spv = getSlidesPerView();
      setSlidesPerView(spv);
      setCurrentIndex(0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, totalSteps - slidesPerView);
  const slidePercent = 100 / slidesPerView;

  const nextStep = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevStep = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const goToStep = (index: number) => setCurrentIndex(index);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLayout}>
          <div className={styles.mainLayout}>
            <div className={styles.titleWrapper}>
              <div className={styles.titleContainer}>
                <h3 className={styles.title}>
                  {t.title}{" "}
                  <span className={styles.highlight}>{t.highlight}</span>
                </h3>
              </div>

              <nav className={styles.navigation}>
                <ul className={styles.navList}>
                  <li
                    className={styles.navArrow}
                    onClick={prevStep}
                    aria-label="Previous review"
                    style={{ cursor: "pointer", opacity: currentIndex === 0 ? 0.4 : 1 }}
                  >
                    <IconArrowLeft />
                  </li>
                  {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <li key={index} className={styles.navItem}>
                      <span
                        className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ""}`}
                        onClick={() => goToStep(index)}
                      />
                    </li>
                  ))}
                  <li
                    className={styles.navArrow}
                    onClick={nextStep}
                    aria-label="Next review"
                    style={{ cursor: "pointer", opacity: currentIndex === maxIndex ? 0.4 : 1 }}
                  >
                    <IconArrowRight />
                  </li>
                </ul>
              </nav>
            </div>

            <div className={styles.carouselContent}>
              <ul
                className={styles.reviewList}
                style={{ transform: `translateX(-${currentIndex * slidePercent}%)` }}
              >
                {t.reviews.map((review, index) => (
                  <li
                    key={review.id}
                    className={`${styles.reviewItem} ${index === currentIndex + 1 && slidesPerView === 3 ? styles.rotated : ""}`}
                  >
                    <ReviewCard {...review} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.reminderLayout}>
          <ReminderCard title={t.reminderTitle} text={t.reminderHighlight} />
        </div>
      </div>
    </section>
  );
};
