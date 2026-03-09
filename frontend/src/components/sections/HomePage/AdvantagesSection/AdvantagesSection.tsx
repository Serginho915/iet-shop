"use client";

import React from "react";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from "./AdvantagesSection.module.scss";
import { AdvantageCard } from "@/components/ui/AdvantageCard/AdvantageCard";

import adv1 from "@/assets/Advantagecard/adv1.png";
import adv2 from "@/assets/Advantagecard/adv2.png";
import adv3 from "@/assets/Advantagecard/adv3.png";
import adv4 from "@/assets/Advantagecard/adv4.png";
import adv5 from "@/assets/Advantagecard/adv5.png";

const advImages = [adv1, adv2, adv3, adv4, adv5];

export const AdvantagesSection = () => {
  const { t } = useTranslate(translations);

  return (
    <section className={styles.advantagesSection}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            {t.items.map((item, index) => (
              <AdvantageCard
                key={index}
                title={item.title}
                description={item.description}
                image={advImages[index]}
                bg={item.bg}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
