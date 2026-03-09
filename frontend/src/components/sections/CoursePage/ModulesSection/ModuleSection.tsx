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
    title_en: "Marketing Foundations",
    title_bg: "Основи на маркетинга",
    descriptions: [
      { text_en: "Digital marketing basics", text_bg: "Основи на дигиталния маркетинг" },
      { text_en: "Social media ecosystem", text_bg: "Социални медии" },
      { text_en: "Content strategy", text_bg: "Контент стратегия" }
    ]
  },
  {
    title_en: "SEO basics",
    title_bg: "Основи на SEO",
    descriptions: [
      { text_en: "Search engine optimization", text_bg: "Оптимизация за търсачки" },
      { text_en: "Keyword research", text_bg: "Проучване на ключови думи" },
      { text_en: "On-page SEO", text_bg: "On-page SEO" }
    ]
  },
  {
    title_en: "Facebook & Ads Manager",
    title_bg: "Facebook & Ads Manager",
    descriptions: [
      { text_en: "Ad campaigns", text_bg: "Рекламни кампании" },
      { text_en: "Targeting", text_bg: "Таргетиране" },
      { text_en: "Budgeting", text_bg: "Бюджетиране" }
    ]
  }
];

export const ModulesSection = ({ course }: ModulesSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t, lang } = useTranslate(translations);

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
