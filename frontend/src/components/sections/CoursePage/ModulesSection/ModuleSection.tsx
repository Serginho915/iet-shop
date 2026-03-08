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



const MOCK_MODULES = [
  {
    title: "Marketing Foundations",
    description: "Digital marketing basics\nSocial media ecosystem\nContent strategy"
  },
  {
    title: "SEO basics",
    description: "Search engine optimization\nKeyword research\nOn-page SEO"
  },
  {
    title: "Facebook & Ads Manager",
    description: "Ad campaigns\nTargeting\nBudgeting"
  },
  {
    title: "Instagram Marketing",
    description: "Profile optimization\nStories and Reels\nInfluencer marketing"
  },
  {
    title: "Content & Copywriting",
    description: "Writing for the web\nStorytelling\nEditing"
  },
  {
    title: "Analytics & Optimization",
    description: "Data analysis\nTesting\nReporting"
  }
];

export const ModulesSection = ({ course }: ModulesSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslate(translations);

  const toggleModule = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const hasExternalModules = course.modules && course.modules.length > 0;
  const displayModules = hasExternalModules ? course.modules! : MOCK_MODULES;

  return (
    <section className={styles.moduleSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.sectionTitle}>{t.title}</h2>

          {displayModules.map((module: ModuleItem, index: number) => {
            const isActive = activeIndex === index;
            const descriptionText = Array.isArray(module.description)
              ? module.description.join('\n')
              : (module.description || "");

            const descriptionItems = descriptionText.split('\n').filter((i: string) => i.trim());

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
                  <span className={styles.moduleTitle}>{module.title}</span>
                </div>

                {isActive && descriptionItems.length > 0 && (
                  <ul className={styles.descriptionList}>
                    {descriptionItems.map((item: string, idx: number) => (
                      <li key={idx} className={styles.descriptionItem}>
                        {item}
                      </li>
                    ))}
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
