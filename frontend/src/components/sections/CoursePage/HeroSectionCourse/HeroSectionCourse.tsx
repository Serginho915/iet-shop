import React from "react";
import Image from "next/image";
import { Course } from "@/lib/api";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import styles from "./HeroSectionCourse.module.scss";
import { IconCalendarHero, IconLocation, IconInfinity, IconBeginner } from "@/components/icons";

import { useTranslate } from "@/lib/useTranslate";
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

  // Calculate converted price (mock logic  1 EUR ~ 1.95 BGN)
  const bgnPrice = (course.price * 1.95583).toFixed(2);

  const renderTitle = (title: string) => {
    return title.replaceAll(' ', '_');
  }

  const renderHighlightedDescription = (text: string) => {
    if (!text) return null;
    const words = text.trim().split(/\s+/);
    if (words.length <= 2) return <span style={{ color: '#ff4d00' }}>{text}</span>;

    const lastTwoIndex = words.length - 2;
    const initialPart = words.slice(0, lastTwoIndex).join(" ");
    const lastPart = words.slice(lastTwoIndex).join(" ");

    return (
      <>
        {initialPart} <span style={{ color: '#ff4d00' }}>{lastPart}</span>
      </>
    );
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.topContent}>
        <div className={styles.leftColumn}>
          <div className={styles.highlightsBox}>
            <p>{renderHighlightedDescription(course.description)}</p>
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
            {course.duration && (
              <li className={styles.infoPill}>
                <IconInfinity className={styles.icon} />
                <span className={styles.label}>{course.duration}</span>
              </li>
            )}
            <li className={styles.infoPill}>
              <IconBeginner className={styles.icon} />
              <span className={styles.label}>{t.beginnerFriendly}</span>
            </li>
          </ul>

          <div className={styles.priceSection}>
            <span className={styles.priceLabel}>{t.price}:</span>
            <div className={styles.priceBox}>
              <span className={styles.eurPrice}>€ {course.price}</span>
              <span className={styles.bgnPrice}>{bgnPrice} лв</span>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          {course.image && (
            <div className={styles.imageContainer}>
              <Image
                src={course.image}
                alt={course.title}
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
        <h1 className={styles.title}>{renderTitle(course.title)}</h1>
        <Link href={`/checkout/${course.slug}`}>
          <Button variant="primary" size="lg" rounded="full">
            {t.bookSpot}
          </Button>
        </Link>
      </div>
    </section>
  );
};
