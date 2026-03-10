"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/header/Header/Header";
import { Footer } from "@/components/footer/Footer/Footer";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from "./CoursePage.module.scss";
import { Course, getCourseBySlug, getCourses } from "@/lib/api";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { HeroSectionCourse } from "@/components/sections/CoursePage/HeroSectionCourse/HeroSectionCourse";
import { useCourse } from "@/lib/CourseContext";

import { AboutSection } from "@/components/sections/CoursePage/AboutSection/AboutSection";
import { AudienceSection } from "@/components/sections/CoursePage/AudienceSection/AudienceSection";
import { ModulesSection } from "@/components/sections/CoursePage/ModulesSection/ModuleSection";
import { LearnSection } from "@/components/sections/CoursePage/LearnSection/LearnSection";
import { ConsultationSection } from "@/components/sections/Generic/ConsultationSection/ConsultationSection";
import { SimilarCoursesSection } from "@/components/sections/CoursePage/SimilarCoursesSection/SimilarCoursesSection";

interface CoursePageProps {
    course?: Course;
    slug: string;
}

export const CoursePage = ({ course: initialCourse, slug }: CoursePageProps) => {
    const { t, lang } = useTranslate(translations);
    const { selectedCourse } = useCourse();

    // Choose data source: context (fast transition) or prop from server
    const courseFromSource = useMemo(() => {
        const targetSlug = slug.toLowerCase().trim();
        if (selectedCourse && selectedCourse.slug?.toLowerCase().trim() === targetSlug) return selectedCourse;
        return initialCourse;
    }, [selectedCourse, initialCourse, slug]);

    const [allCourses, setAllCourses] = useState<Course[]>([]);

    useEffect(() => {
        getCourses().then(setAllCourses);
    }, []);

    // Safety fetch if both sources are missing
    // Use null for "fetch attempted but nothing found" to avoid infinite loop
    const [fetchedCourse, setFetchedCourse] = useState<Course | undefined | null>(undefined);
    useEffect(() => {
        if (!courseFromSource && fetchedCourse === undefined) {
            getCourseBySlug(slug).then(res => setFetchedCourse(res || null));
        }
    }, [courseFromSource, fetchedCourse, slug]);

    const finalCourse = courseFromSource || (fetchedCourse === null ? undefined : fetchedCourse);

    const breadcrumbs: BreadcrumbItem[] = [
        { label: t.course, href: "/#courses" },
        {
            label: (function () {
                if (lang === 'bg' && finalCourse?.title_bg) return String(finalCourse.title_bg);
                if (lang === 'en' && finalCourse?.title_en) return String(finalCourse.title_en);
                if (typeof finalCourse?.title === 'object' && finalCourse.title) {
                    return String((finalCourse.title as any)[lang] || (finalCourse.title as any).en || (finalCourse.title as any).bg || "");
                }
                return String(finalCourse?.title || slug);
            })()
        }
    ];

    const formattedStart = finalCourse?.start
        ? new Date(finalCourse.start).toLocaleDateString(lang === "bg" ? "bg-BG" : "en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "";

    return (
        <div className={styles.coursePageWrapper}>
            <Header />
            <main className={styles.coursePage}>
                <div className={styles.container}>
                    <Breadcrumbs items={breadcrumbs} />

                    {!finalCourse ? (
                        <div style={{ padding: '160px 0' }} /> // Empty space instead of text
                    ) : (

                        <>
                            <HeroSectionCourse
                                course={finalCourse}
                                formattedStart={formattedStart}
                            />

                            <AboutSection course={finalCourse} />
                            <AudienceSection course={finalCourse} />
                            <ModulesSection course={finalCourse} />
                            <LearnSection course={finalCourse} />
                            <ConsultationSection courses={allCourses} />
                            <SimilarCoursesSection course={finalCourse} allCourses={allCourses} />
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

