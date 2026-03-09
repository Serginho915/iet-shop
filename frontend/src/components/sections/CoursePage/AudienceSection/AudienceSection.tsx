import React from "react";
import Image from "next/image";
import { Course } from "@/lib/api";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from "./AudienceSection.module.scss";

// Static imports for fixed assets in src/assets
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
  const { t, lang } = useTranslate(translations);

  const audienceImage = course.audience_image || image;

  const audienceTags =
    course.extra_audience_tags && course.extra_audience_tags.length > 0
      ? course.extra_audience_tags.map(card => {
        const cardTitle = typeof card.title === 'object' && card.title
          ? ((card.title as any)[lang] || (card.title as any).en || (card.title as any).bg || "")
          : card.title;
        const cardText = typeof card.text === 'object' && card.text
          ? ((card.text as any)[lang] || (card.text as any).en || (card.text as any).bg || "")
          : card.text;
        return [String(cardTitle || ""), String(cardText || "")];
      })
      : [];

  const getAgeLabel = (course: Course) => {
    const isAdult = course.audience === "adults";
    const label = isAdult ? t.minimalAge : t.maximalAge;

    // Look for a tag that looks like an age range, e.g. "7-14" or "15+"
    const ageTag = course.tags.find((tag) => {
      const tagName = typeof tag === 'object' && tag
        ? ((tag as any).name?.[lang] || (tag as any)[lang] || (tag as any).name_en || (tag as any).name_bg || (tag as any).name || "")
        : tag;
      const tagStr = String(tagName || "");
      return tagStr?.match(/\d+-\d+/) || tagStr?.match(/\d+\+/);
    });

    if (ageTag) {
      const tagName = typeof ageTag === 'object' && ageTag
        ? ((ageTag as any).name?.[lang] || (ageTag as any)[lang] || (ageTag as any).name_en || (ageTag as any).name_bg || (ageTag as any).name || "")
        : ageTag;
      return label;
    }
    // If no specific age tag is found, return the default label.
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
              {audienceTags.map((tag: any, index: number) => (
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