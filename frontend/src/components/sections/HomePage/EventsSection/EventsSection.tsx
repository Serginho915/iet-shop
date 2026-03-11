"use client";

import React, { useState, useRef } from "react";
import styles from "./EventsSection.module.scss";
import { useTranslate } from "@/lib/useTranslate";
import { translations, type EventsTranslations } from "./translations";
import { EventCard } from "@/components/ui/EventCard/EventCard";
import { IconArrowDown } from "@/components/icons";
import { Event } from "@/lib/api";
import { EventRegistrationModal } from "@/components/ui/EventRegistrationModal/EventRegistrationModal";

interface EventsSectionProps {
  events?: Event[];
}

export const EventsSection = ({ events = [] }: EventsSectionProps) => {
  const { t, lang } = useTranslate<EventsTranslations>(translations);
  const sectionRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExpanded = () => {
    if (isExpanded && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsExpanded(!isExpanded);
  };

  const handleJoinClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter((event) => !event.date || event.date >= today);
  const hasMore = upcomingEvents.length > 3;

  return (
    <section className={styles.section} id="events" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <div className={styles.badge}>
            <span>{t.badge}</span>
          </div>
          <h2 className={styles.title}>{t.title}</h2>
        </div>

        <div className={`${styles.scrollContainer} ${isExpanded ? styles.expanded : ''}`}>
          <div className={styles.eventsList}>
            {upcomingEvents.map((event) => {
              const dateObj = new Date(event.date);
              const formattedDate = !isNaN(dateObj.getTime())
                ? dateObj.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
                : event.date;

              const title = typeof event.title === 'object' && event.title
                ? (event.title[lang === 'bg' ? 'bg' : 'en'] || event.title.en || event.title.bg || "")
                : event.title;

              const eventTags = event.tags.map(tag => {
                const tagName = tag.name;
                if (typeof tagName === 'object' && tagName) {
                  return tagName[lang === 'bg' ? 'bg' : 'en'] || tagName.en || tagName.bg || "";
                }
                return tagName || "";
              });

              const description = typeof event.description === 'object' && event.description
                ? (event.description[lang === 'bg' ? 'bg' : 'en'] || event.description.en || event.description.bg || "")
                : event.description;

              return (
                <EventCard
                  key={event.id}
                  title={String(title || "")}
                  date={formattedDate}
                  tags={eventTags.map(String)}
                  location={event.type}
                  description={String(description || "")}
                  image1={event.image_1}
                  image2={event.image_2}
                  joinBtnText={t.joinBtn}
                  onJoin={() => handleJoinClick(event)}
                />
              );
            })}
            {upcomingEvents.length === 0 && <div className={styles.noEvents}>{t.noEvents}</div>}
          </div>
        </div>

        {hasMore && (
          <button
            className={`${styles.scrollBtn} ${isExpanded ? styles.rotated : ''}`}
            onClick={toggleExpanded}
            aria-label={isExpanded ? "Collapse events" : "Expand all events"}
          >
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
