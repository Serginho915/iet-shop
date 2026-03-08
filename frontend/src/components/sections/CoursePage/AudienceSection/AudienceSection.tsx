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
  const { t } = useTranslate(translations);
  const audienceTags =
    course.audience_tags && course.audience_tags.length > 0
      ? [course.audience_tags] // If it's a single tuple from API
      : [
        ["Complete Beginners", "with no prior marketing experience"],
        ["Career Switchers", "looking for a new direction"],
        ["Marketing Professionals", "wanting to stay up-to-date"],
        ["Entrepreneurs", "seeking to grow their business"],
      ];
  const getAgeLabel = (course: Course) => {
    const isAdult = course.audience === "adults";
    const label = isAdult ? t.minimalAge : t.maximalAge;

    // Look for a tag that looks like an age range, e.g. "7-14" or "15+"
    const ageTag = course.tags.find((tag) =>
      tag.name.match(/\d+-\d+/) || tag.name.match(/\d+\+/)
    );

    if (ageTag) {
      const matchRange = ageTag.name.match(/(\d+)-(\d+)/);
      if (matchRange) {
        return isAdult
          ? `${t.minimalAge}: ${matchRange[1]} +`
          : `${t.maximalAge}: ${matchRange[2]}`;
      }
      const matchPlus = ageTag.name.match(/(\d+)\+/);
      if (matchPlus) {
        return isAdult
          ? `${t.minimalAge}: ${matchPlus[1]} +`
          : `${t.maximalAge}: ${matchPlus[1]}`;
      }
      return `${label}: ${ageTag.name}`;
    }

    return `${label}: ${isAdult ? "15 +" : "14"}`;
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
              src={image}
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
              {audienceTags.map((tag, index) => (
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
