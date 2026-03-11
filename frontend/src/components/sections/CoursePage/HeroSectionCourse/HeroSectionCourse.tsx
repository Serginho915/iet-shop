"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Course } from "@/lib/api";
import styles from "./HeroSectionCourse.module.scss";
import { IconCalendarHero, IconLocation, IconInfinity, IconBeginner, IconVisits } from "@/components/icons";

import { useTranslate } from "@/lib/useTranslate";
import { useCourse } from "@/lib/CourseContext";
import { translations } from "./translations";
import { Button } from "@/components/ui/Button/Button";

interface HeroSectionCourseProps {
  course: Course;
  formattedStart: string;
}

export const HeroSectionCourse = ({
  course,
  formattedStart,
}: HeroSectionCourseProps) => {
  const { t, lang } = useTranslate(translations);
  const { setSelectedCourse } = useCourse();
  const router = useRouter();

  const title = (function () {
    if (lang === 'bg' && course.title_bg) return String(course.title_bg);
    if (lang === 'en' && course.title_en) return String(course.title_en);
    if (typeof course.title === 'object' && course.title) {
      return String((course.title as any)[lang] || (course.title as any).en || (course.title as any).bg || "");
    }
    return String(course.title || "");
  })();

  const description = (function () {
    if (lang === 'bg' && course.description_bg) return String(course.description_bg);
    if (lang === 'en' && course.description_en) return String(course.description_en);
    if (typeof course.description === 'object' && course.description) {
      return String((course.description as any)[lang] || (course.description as any).en || (course.description as any).bg || "");
    }
    return String(course.description || "");
  })();

  const duration = (function () {
    if (lang === 'bg' && course.duration_bg) return String(course.duration_bg);
    if (lang === 'en' && course.duration_en) return String(course.duration_en);
    if (typeof course.duration === 'object' && course.duration) {
      return String((course.duration as any)[lang] || (course.duration as any).en || (course.duration as any).bg || "");
    }
    return String(course.duration || "");
  })();

  // Price calculation (EUR to BGN conversion)
  // For now, we only show EUR as stored in the database.
  // BGN price should ideally come from backend or a real exchange rate service.

  const renderHighlightedDescription = (text: string) => {
    if (!text) return null;
    const words = text.trim().split(/\s+/);
    if (words.length <= 2) return <span className={styles.accentText}>{text}</span>;

    const lastTwoIndex = words.length - 2;
    const initialPart = words.slice(0, lastTwoIndex).join(" ");
    const lastPart = words.slice(lastTwoIndex).join(" ");

    return (
      <>
        {initialPart} <span className={styles.accentText}>{lastPart}</span>
      </>
    );
  };

  const handleBookSpot = () => {
    if (course) {
      setSelectedCourse(course);
      router.push(`/${lang}/checkout/${course.slug}`);
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.topContent}>
        <div className={styles.leftColumn}>
          <div className={styles.highlightsBox}>
            <p>{renderHighlightedDescription(description || "")}</p>
          </div>

          <ul className={styles.infoGrid}>
            {formattedStart && (
              <li className={styles.infoPill}>
                <IconCalendarHero className={styles.icon} />
                <span className={styles.label}>{formattedStart}</span>
              </li>
            )}
            {course.type && (
              <li className={styles.infoPill}>
                <IconLocation className={styles.icon} />
                <span className={styles.label}>{course.type}</span>
              </li>
            )}
            {duration && (
              <li className={styles.infoPill}>
                <IconInfinity className={styles.icon} />
                <span className={styles.label}>{duration}</span>
              </li>
            )}
            <li className={styles.infoPill}>
              <IconBeginner className={styles.icon} />
              <span className={styles.label}>{t.beginnerFriendly}</span>
            </li>
            {course.visits_per_week && (
              <li className={styles.infoPill}>
                <IconVisits className={styles.icon} />
                <span className={styles.label}>{course.visits_per_week} {t.visitsPerWeek}</span>
              </li>
            )}
          </ul>

          <div className={styles.priceSection}>
            <span className={styles.priceLabel}>{t.price}:</span>
            <div className={styles.pricesContainer}>
              <div className={styles.priceBox}>
                <span className={styles.eurPrice}>€ {course.price}</span>
                <span className={styles.bgnPrice}>{(course.price * 1.95583).toFixed(2)} лв</span>
              </div>
              {course.monthly_installment_price && (
                <div className={styles.priceBox}>
                  <span className={styles.eurPrice}>€ <span className={styles.bold}>{course.monthly_installment_price}</span>/{t.month}</span>
                  <span className={styles.bgnPrice}>{(course.monthly_installment_price * 1.95583).toFixed(2)} лв</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          {course.image && (
            <div className={styles.imageContainer}>
              <Image
                src={course.image}
                alt={title || ""}
                width={555}
                height={359}
                className={styles.courseImage}
                priority
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.bottomContent}>
        <h1 className={styles.title}>{title || ""}</h1>
        <Button
          variant="primary"
          size="custom"
          rounded="xl"
          className={styles.bookButton}
          onClick={handleBookSpot}
        >
          {t.bookSpot}
        </Button>
      </div>
    </section>
  );
};
