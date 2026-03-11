import React from "react";
import Image from "next/image";
import { Course } from "@/lib/api";
import styles from "./AboutSection.module.scss";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "./translations";

interface AboutSectionProps {
  course: Course;
}

export const AboutSection = ({ course }: AboutSectionProps) => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const renderHighlightedTitle = (text: string) => {
    const words = text.split(" ");
    if (words.length === 0) return null;

    const firstThree = words.slice(0, 3).join(" ");
    const remaining = words.slice(3).join(" ");

    return (
      <>
        <span className={styles.accent}>{firstThree}</span> {remaining}
      </>
    );
  };

  const titleText = (function () {
    if (lang === 'bg' && course.about_title_bg) return String(course.about_title_bg);
    if (lang === 'en' && course.about_title_en) return String(course.about_title_en);
    if (typeof course.about_title === 'object' && course.about_title) {
      return String((course.about_title as any)[lang] || (course.about_title as any).en || (course.about_title as any).bg || "");
    }
    return String(course.about_title || "");
  })();

  const descriptionTop = (function () {
    if (lang === 'bg' && course.about_description_top_bg) return String(course.about_description_top_bg);
    if (lang === 'en' && course.about_description_top_en) return String(course.about_description_top_en);
    if (typeof course.about_description_top === 'object' && course.about_description_top) {
      return String((course.about_description_top as any)[lang] || (course.about_description_top as any).en || (course.about_description_top as any).bg || "");
    }
    return String(course.about_description_top || "");
  })();

  const descriptionBottom = (function () {
    if (lang === 'bg' && course.about_description_bottom_bg) return String(course.about_description_bottom_bg);
    if (lang === 'en' && course.about_description_bottom_en) return String(course.about_description_bottom_en);
    if (typeof course.about_description_bottom === 'object' && course.about_description_bottom) {
      return String((course.about_description_bottom as any)[lang] || (course.about_description_bottom as any).en || (course.about_description_bottom as any).bg || "");
    }
    return String(course.about_description_bottom || "");
  })();

  return (
    <section className={styles.aboutSection}>
      {/* <div className={styles.container}> */}
      <h2 className={styles.sectionTitle}>{t.title}</h2>
      <div className={styles.grid}>
        <div className={styles.headingBox}>
          <h3 className={styles.aboutH3}>
            {renderHighlightedTitle(titleText)}
          </h3>
        </div>

        <div className={styles.blocksBox}>
          <div className={styles.cardsWrapper}>
            <div className={styles.blackCard}>
              <p className={styles.textL}>
                {descriptionTop}
              </p>
            </div>
            <p className={styles.textLBottom}>
              {descriptionBottom}
            </p>
          </div>
        </div>

        {/* Column 3: Image Stack */}
        <div className={styles.imageBox}>
          <div className={styles.imageFanned}>
            {course.about_image ? (
              <Image
                src={course.about_image}
                alt="About Course image"
                width={342}
                height={400}
                className={styles.mainImg}
              />
            ) : (
              <div className={styles.mainImgPlaceholder} aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};
