import React from "react";
import Image from "next/image";
import { Course } from "@/lib/api";
import { useTranslate } from "@/lib/useTranslate";
import { translations, type AudienceTranslations } from "./translations";
import styles from "./AudienceSection.module.scss";


import image from "@/assets/AudienceSection/girl & guy.png";
import vec0 from "@/assets/AudienceSection/vec-0.svg";
import vec1 from "@/assets/AudienceSection/vec-1.svg";
import vec2 from "@/assets/AudienceSection/vec-2.svg";
import vec3 from "@/assets/AudienceSection/vec-3.svg";

interface AudienceSectionProps {
  course: Course;
}

const icons = [vec0, vec1, vec2, vec3];

export const AudienceSection = ({ course }: AudienceSectionProps) => {
  const { t, lang } = useTranslate<AudienceTranslations>(translations);

  const audienceImage = course.audience_image || image;

  const audienceTags =
    course.extra_audience_tags && course.extra_audience_tags.length > 0
      ? course.extra_audience_tags.map(card => {
        const rawTitle = card.title;
        const cardTitle = typeof rawTitle === 'object' && rawTitle
          ? (rawTitle[lang === 'bg' ? 'bg' : 'en'] || rawTitle.en || rawTitle.bg || "")
          : rawTitle;

        const rawText = card.text;
        const cardText = typeof rawText === 'object' && rawText
          ? (rawText[lang === 'bg' ? 'bg' : 'en'] || rawText.en || rawText.bg || "")
          : rawText;
        return [String(cardTitle || ""), String(cardText || "")];
      })
      : [];

  const getAgeLabel = (course: Course) => {
    const isAdult = course.audience === "adults";
    const label = isAdult ? t.minimalAge : t.maximalAge;


    const ageTag = course.tags.find((tag) => {
      const tagName = tag.name;
      const tagStr = typeof tagName === 'object' && tagName
        ? (tagName[lang === 'bg' ? 'bg' : 'en'] || tagName.en || tagName.bg || "")
        : (tagName || "");
      return String(tagStr)?.match(/\d+-\d+/) || String(tagStr)?.match(/\d+\+/);
    });

    if (ageTag) {
      return label;
    }
    return label;
  };

  return (
    <section className={styles.audienceSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{t.title}</h2>
        <div className={styles.grid}>
          {/* Column 1: Image and Audience Label */}
          <div className={styles.imageBox}>
            <div className={styles.audienceBadge}>
              {getAgeLabel(course)}
            </div>
            <Image
              src={audienceImage}
              alt="Course Audience"
              width={624}
              height={502}
              className={styles.audienceImage}
              priority
            />
          </div>

          {/* Column 2: Checkmark List */}
          {audienceTags.length > 0 && (
            <ul className={styles.audienceList}>
              {audienceTags.map((tag: string[], index: number) => (
                <li key={index} className={styles.audienceItem}>
                  <div className={styles.iconWrapper}>
                    <Image
                      src={icons[index % icons.length]}
                      alt="Checkmark icon"
                      width={23}
                      height={23}
                      className={styles.checkIcon}
                    />
                  </div>
                  <div className={styles.textWrapper}>
                    <span className={styles.audienceTitle}>{tag[0]}</span>
                    <span className={styles.audienceText}>{tag[1]}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};