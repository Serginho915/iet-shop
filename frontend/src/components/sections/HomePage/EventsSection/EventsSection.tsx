"use client";

import React, { useRef, useState } from "react";
import styles from "./EventsSection.module.scss";
import { useTranslate } from "@/lib/useTranslate";
import { translations, type EventsTranslations } from "./translations";
import { EventCard } from "@/components/ui/EventCard/EventCard";
import { IconArrowDown } from "@/components/icons";
import { useVerticalScroll } from "@/lib/useVerticalScroll";
import { Event } from "@/lib/api";
import { EventRegistrationModal } from "@/components/ui/EventRegistrationModal/EventRegistrationModal";

interface EventsSectionProps {
  events?: Event[];
}

export const EventsSection = ({ events = [] }: EventsSectionProps) => {
  const { t, lang } = useTranslate<EventsTranslations>(translations);

  const { containerRef, scrollNext } = useVerticalScroll({
    cardHeight: 180,
    gap: 24,
  });

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

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

              // Robust localization for title
              const title = typeof event.title === 'object' && event.title
                ? (event.title[lang === 'bg' ? 'bg' : 'en'] || event.title.en || event.title.bg || "")
                : event.title;

              // Robust localization for tags
              const eventTags = event.tags.map(tag => {
                const tagName = tag.name;
                if (typeof tagName === 'object' && tagName) {
                  return tagName[lang === 'bg' ? 'bg' : 'en'] || tagName.en || tagName.bg || "";
                }
                return tagName || "";
              });

              return (
                <EventCard
                  key={event.id}
                  title={String(title || "")}
                  date={formattedDate}
                  tags={eventTags.map(String)}
                  location={event.type}
                  description={event.description}
                  image1={event.image_1}
                  image2={event.image_2}
                  joinBtnText={t.joinBtn}
                  onJoin={() => handleJoinClick(event)}
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

      <EventRegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </section>
  );
};
