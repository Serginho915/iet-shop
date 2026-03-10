"use client";

import { HeroSection } from "@/components/sections/HomePage/HeroSection/HeroSection";
import { AchievementsSection } from "@/components/sections/HomePage/AchievementsSection/AchievementsSection";
import { EventsSection } from "@/components/sections/HomePage/EventsSection/EventsSection";
import { AdvantagesSection } from "@/components/sections/HomePage/AdvantagesSection/AdvantagesSection";
import { JourneySection } from "@/components/sections/HomePage/JourneySection/JourneySection";
import { CoursesSection } from "@/components/sections/HomePage/CoursesSection/CoursesSection";
import { ReviewsSection } from "@/components/sections/HomePage/ReviewsSection/ReviewsSection";
import { ConsultationSection } from "@/components/sections/Generic/ConsultationSection/ConsultationSection";
import { BlogSection } from "@/components/sections/HomePage/BlogSection/BlogSection";
import { FAQSection } from "@/components/sections/HomePage/FAQSection/FAQSection";

import { Header } from "@/components/header/Header/Header";
import { Footer } from "@/components/footer/Footer/Footer";
import styles from "./PageContent.module.scss";
import { useState, useEffect } from "react";
import { getHomePageData, Course, Post, Tag, Event } from "@/lib/api";

export const PageContent = ({
    metadata: initialMetadata = {},
    courses: initialCourses = [],
    posts: initialPosts = [],
    tags: initialTags = [],
    events: initialEvents = []
}: {
    metadata?: Record<string, unknown>;
    courses?: Course[];
    posts?: Post[];
    tags?: Tag[];
    events?: Event[];
}) => {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [tags, setTags] = useState<Tag[]>(initialTags);
    const [events, setEvents] = useState<Event[]>(initialEvents);

    useEffect(() => {

        if (initialCourses.length === 0 && initialPosts.length === 0) {
            console.log("[Client] Server data missing, fetching directly from API...");
            getHomePageData().then(data => {
                setCourses(data.courses);
                setPosts(data.posts);
                setTags(data.tags);
                setEvents(data.events);
            }).catch(err => {
                console.error("[Client] API call failed:", err);
            });
        }
    }, [initialCourses, initialPosts]);

    return (
        <>
            <Header />
            <main className={styles.page}>
                <HeroSection metadata={initialMetadata} />
                <EventsSection events={events} />
                <CoursesSection courses={courses} tags={tags} />
                <AdvantagesSection />
                <JourneySection />
                <ReviewsSection />
                <ConsultationSection courses={courses} />
                <BlogSection posts={posts} />
                <FAQSection />
            </main>
            <Footer />
        </>
    );
};
