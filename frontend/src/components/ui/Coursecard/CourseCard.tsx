"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { IconHelpBtn } from '@/components/icons';
import styles from './CourseCard.module.scss';
import { useTranslate } from "@/lib/useTranslate";
import { useRouter } from 'next/navigation';
import { Course } from "@/lib/api";
import { translations } from "./translations";

interface CourseCardProps {
  course?: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { t, lang } = useTranslate(translations);
  const router = useRouter();

  const title = course?.title ?? "Front End Development";
  const slug = course?.slug ?? "javascript-course";
  const courseType = course?.type ?? "hybrid";
  const duration = course?.duration ?? "2 months";
  const startDate = course?.start
    ? new Date(course.start).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "12 May 2026";

  const handleCardClick = () => {
    router.push(`/${lang}/courses/${slug}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={styles.top}>
        <div className={styles.imagePlaceholder} />
        <div className={styles.badges}>
          <div className={styles.badge}>{duration}</div>
          <div className={styles.badge}>{courseType}</div>
          <div className={styles.badge}>{t.start}: {startDate}</div>
        </div>
      </div>

      <div className={styles.titleWrapper}>
        <div className={styles.dot} />
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.footer}>
        <Link
          href="#consultation"
          className={styles.actionLink}
          onClick={(e) => e.stopPropagation()}
        >
          <IconHelpBtn />
        </Link>
        <Button
          variant="primary"
          rounded="full"
          className={styles.submitBtn}
          onClick={(e) => {
            e.stopPropagation();
            // action for leave request
          }}
        >
          {t.leaveRequest}
        </Button>
      </div>
    </div>
  );
};
