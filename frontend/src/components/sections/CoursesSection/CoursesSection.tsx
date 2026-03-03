"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { translations, courseTags, courseTypes } from "./translations";
import styles from "./CoursesSection.module.scss";
import { IconLightbulb, IconHelpBtn } from "@/components/icons";
import { CourseCard } from "@/components/ui/Coursecard/CourseCard";
import { Select } from "@/components/ui/Select/Select";
import { Course } from "@/lib/api";
import { useTranslate } from "@/lib/useTranslate";

interface CoursesSectionProps {
  courses?: Course[];
}

const CoursesContent = ({ courses = [] }: CoursesSectionProps) => {
  const { t, lang } = useTranslate(translations);
  const searchParams = useSearchParams();
  const router = useRouter();

  const tags = courseTags[lang];
  const types = courseTypes[lang];

  const [activeTag, setActiveTag] = useState("all");
  const [activeType, setActiveType] = useState("all");

  useEffect(() => {
    const tagFromUrl = searchParams.get("courseTag");
    if (tagFromUrl && tags.some(t => t.id === tagFromUrl)) {
      setActiveTag(tagFromUrl);
    } else {
      setActiveTag("all");
    }

    const typeFromUrl = searchParams.get("courseType");
    if (typeFromUrl && types.some(t => t.id === typeFromUrl)) {
      setActiveType(typeFromUrl);
    } else {
      setActiveType("all");
    }
  }, [searchParams, tags, types]);

  const handleTagChange = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("courseTag");
    } else {
      params.set("courseTag", id);
    }
    router.push(`?${params.toString()}#courses`, { scroll: false });
  };

  const handleTypeChange = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("courseType");
    } else {
      params.set("courseType", id);
    }
    router.push(`?${params.toString()}#courses`, { scroll: false });
  };


  const filteredCourses = courses.filter((course) => {
    const matchesTag = activeTag === "all" || course.tags.some(tag => tag.name === activeTag);
    const matchesType = activeType === "all" || course.type === activeType;
    return matchesTag && matchesType;
  });

  return (
    <section id="courses" className={styles.coursesSection}>
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.title}>{t.choosePath}</h2>

          <div className={styles.tipBlock}>
            <div className={styles.tipContent}>
              <IconLightbulb className={styles.tipIcon} />
              <div className={styles.tipText}>
                <span className={styles.tipTitle}>{t.tipLabel}</span>{" "}
                {t.tipText}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.selectors}>
            <Select
              options={tags}
              value={activeTag}
              onChange={handleTagChange}
              placeholder="Category"
              className={styles.selector}
            />
            <Select
              options={types}
              value={activeType}
              onChange={handleTypeChange}
              placeholder="Type"
              className={styles.selector}
            />
          </div>

          <div className={styles.helpContact}>
            <div className={styles.helpTextWrapper}>
              <h4 className={styles.helpSubtitle}>{t.helpDeciding}</h4>
              <p className={styles.helpDescription}>{t.helpDecidingText}</p>
            </div>

            <Link href="#consultation" className={styles.helpLink} aria-label="Contact us">
              <IconHelpBtn />
            </Link>
          </div>
        </div>

        <div className={styles.coursesGrid}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className={styles.noResults}>No courses found matching these criteria.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export const CoursesSection = (props: CoursesSectionProps) => {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <CoursesContent {...props} />
    </Suspense>
  );
};
