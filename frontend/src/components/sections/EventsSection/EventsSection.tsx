"use client";

import React from "react";
import styles from "./EventsSection.module.scss";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import { EventCard } from "@/components/ui/EventCard/EventCard";
import { IconArrowDown } from "@/components/icons";
import { useVerticalScroll } from "@/lib/useVerticalScroll";

export const EventsSection = () => {
  const { t } = useTranslate(translations);

  const { containerRef, scrollNext } = useVerticalScroll({
    cardHeight: 180,
    gap: 24,
  });

  return (
    <section className={styles.section} id="events">
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <div className={styles.badge}>
            <span>{t.badge}</span>
          </div>
          <h2 className={styles.title}>{t.title}</h2>
        </div>

        <div className={styles.scrollContainer} ref={containerRef}>
          <div className={styles.eventsList}>
            {t.events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                tags={event.tags}
                location={event.location}
                joinBtnText={t.joinBtn}
                onJoin={() => {
                  if (typeof window !== 'undefined' && event.joinUrl) {
                    window.open(event.joinUrl, '_blank');
                  }
                }}
              />
            ))}
          </div>
        </div>

        <button className={styles.scrollBtn} onClick={scrollNext} aria-label="Scroll to next events">
          <IconArrowDown />
        </button>
      </div>
    </section>
  );
};
