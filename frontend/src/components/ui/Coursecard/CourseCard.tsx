"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import { IconHelpBtn, IconInfinity, IconLocationCourse, IconClock } from '@/components/icons';
import styles from './CourseCard.module.scss';
import { useTranslate } from "@/lib/useTranslate";
import { useCourse } from "@/lib/CourseContext";
import { useRouter } from 'next/navigation';
import { Course } from "@/lib/api";
import { translations } from "./translations";

interface CourseCardProps {
  course?: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { t, lang } = useTranslate(translations);
  const router = useRouter();
  const { setSelectedCourse } = useCourse();

  const title = course?.title ?? "Front End Development";
  const slug = course?.slug ?? "javascript-course";
  const courseType = course?.type ?? "hybrid";
  const duration = course?.duration ?? "2 months";
  const description = course?.description;
  const imageUrl = course?.image;

  const startDateLabel = t.start;
  const startDate = course?.start
    ? new Date(course.start).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "12 May 2026";

  const typeLabel = (t as any)[courseType] || courseType;

  const handleCardClick = () => {
    if (course) {
      setSelectedCourse(course);
    }
    router.push(`/${lang}/courses/${slug}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={styles.top}>
        <div className={styles.imageContainer}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={250}
              height={155}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>
        <div className={styles.badges}>
          <div className={styles.badge}>
            <IconInfinity className={styles.badgeIcon} />
            <span className={styles.badgeText}>{duration}</span>
          </div>
          <div className={styles.badge}>
            <IconLocationCourse className={styles.badgeIcon} />
            <span className={styles.badgeText}>{typeLabel}</span>
          </div>
          <div className={styles.badge}>
            <IconClock className={styles.badgeIcon} />
            <span className={styles.badgeText}>{startDateLabel}: {startDate}</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <div className={styles.dot} />
          <h3 className={styles.title}>{title}</h3>
        </div>
        {description && <p className={styles.description}>{description}</p>}
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
            const el = document.getElementById("consultation");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            } else {
              router.push(`/${lang}/#consultation`);
            }
          }}
        >
          {t.leaveRequest}
        </Button>
      </div>
    </div>
  );
};
