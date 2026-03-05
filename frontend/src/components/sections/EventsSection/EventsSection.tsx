"use client";

import React from "react";
import styles from "./EventsSection.module.scss";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import { EventCard } from "@/components/ui/EventCard/EventCard";
import { IconArrowDown } from "@/components/icons";
import { useVerticalScroll } from "@/lib/useVerticalScroll";
import { Event } from "@/lib/api";

interface EventsSectionProps {
  events?: Event[];
}

export const EventsSection = ({ events = [] }: EventsSectionProps) => {
  const { t, lang } = useTranslate(translations);

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
            {events.map((event) => {
              const dateObj = new Date(event.date);
              const formattedDate = !isNaN(dateObj.getTime())
                ? dateObj.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
                : event.date;

              return (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={formattedDate}
                  tags={event.tags.map(tag => tag.name)}
                  location={event.type}
                  joinBtnText={t.joinBtn}
                  onJoin={() => {
                    // Logic for joining event could be added here
                  }}
                />
              );
            })}
            {events.length === 0 && <div className={styles.noEvents}>{lang === 'bg' ? 'Няма предстоящи събития' : 'No upcoming events'}</div>}
          </div>
        </div>

        {events.length > 0 && (
          <button className={styles.scrollBtn} onClick={scrollNext} aria-label="Scroll to next events">
            <IconArrowDown />
          </button>
        )}
      </div>
    </section>
  );
};
