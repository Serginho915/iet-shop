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

  const titleText =
    course.about_title || "Start your career in digital marketing";

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
                {course.about_description_top ||
                  "This 5-week online masterclass teaches you how to build and grow brands in social media, create high-converting ads and work with real clients."}
              </p>
            </div>
            <p className={styles.textLBottom}>
              {course.about_description_bottom ||
                "You'll learn both organic growth and paid advertising strategies, including full campaign setup and optimization."}
            </p>
          </div>
        </div>

        {/* Column 3: Image Stack */}
        <div className={styles.imageBox}>
          <div className={styles.imageFanned}>
            <Image
              src={course.about_image || ""}
              alt="About Course image"
              width={342}
              height={400}
              className={styles.mainImg}
            />
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};
