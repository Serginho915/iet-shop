import React, { useState } from "react";
import { Course } from "@/lib/api";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from "./ModulesSection.module.scss";
import Image from "next/image";
import IconArrow from "@/assets/ModuleSection/double-arrow.svg";

interface ModuleItem {
  title: string;
  description: string | string[];
}

interface ModulesSectionProps {
  course: Course;
}



export const ModulesSection = ({ course }: ModulesSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t, lang } = useTranslate(translations);

  const toggleModule = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const displayModules = course.modules || [];

  return (
    <section className={styles.moduleSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.sectionTitle}>{t.title}</h2>

          {displayModules.map((module: any, index: number) => {
            const isActive = activeIndex === index;
            const title = typeof module.title === 'object' && module.title
              ? ((module.title as any)[lang] || (module.title as any).en || (module.title as any).bg || "")
              : (module.title_en || module.title_bg || module.title || "");

            const descriptions = module.description || module.descriptions || [];

            return (
              <div
                key={index}
                className={`${styles.moduleWrapper} ${isActive ? styles.active : ''}`}
              >
                <div
                  className={styles.modulePill}
                  onClick={() => toggleModule(index)}
                >
                  <div className={styles.iconWrapper}>
                    <Image
                      src={IconArrow}
                      alt="Arrow"
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className={styles.moduleTitle}>{String(title || "")}</span>
                </div>

                {isActive && (Array.isArray(descriptions) ? descriptions.length > 0 : !!descriptions) && (
                  <ul className={styles.descriptionList}>
                    {Array.isArray(descriptions) ? descriptions.map((desc: any, idx: number) => {
                      const text = typeof desc === 'object' && desc
                        ? (desc[lang] || desc.text || desc.text_en || desc.text_bg || "")
                        : desc;
                      return (
                        <li key={idx} className={styles.descriptionItem}>
                          {String(text || "")}
                        </li>
                      );
                    }) : (
                      <li className={styles.descriptionItem}>
                        {String(descriptions || "")}
                      </li>
                    )}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
