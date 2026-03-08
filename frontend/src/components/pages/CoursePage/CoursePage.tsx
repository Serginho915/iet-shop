"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header/Header/Header";
import { Footer } from "@/components/footer/Footer/Footer";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from "./CoursePage.module.scss";
import { Course, getCourseBySlug, getCourses } from "@/lib/api";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { HeroSectionCourse } from "@/components/sections/CoursePage/HeroSectionCourse/HeroSectionCourse";

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
    const [course, setCourse] = useState<Course | undefined>(initialCourse);
    const [allCourses, setAllCourses] = useState<Course[]>([]);

    useEffect(() => {
        getCourses().then(setAllCourses);
    }, []);

    useEffect(() => {
        if (!course) {
            getCourseBySlug(slug).then(setCourse);
        }
    }, [slug, course]);

    const breadcrumbs: BreadcrumbItem[] = [
        { label: t.course, href: "/#courses" },
        { label: course?.title || slug }
    ];

    const formattedStart = course?.start
        ? new Date(course.start).toLocaleDateString(lang === "bg" ? "bg-BG" : "en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "";

    if (!course) {
        return (
            <div className={styles.coursePageWrapper}>
                <Header />
                <main className={styles.coursePage}>
                    <div className={styles.container}>
                        <Breadcrumbs items={breadcrumbs} />
                        <div style={{ padding: '40px 0', textAlign: 'center' }}>Loading course data...</div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.coursePageWrapper}>
            <Header />
            <main className={styles.coursePage}>
                <div className={styles.container}>
                    <Breadcrumbs items={breadcrumbs} />

                    <HeroSectionCourse
                        course={course}
                        formattedStart={formattedStart}
                    />

                    <AboutSection course={course} />
                    <AudienceSection course={course} />
                    <ModulesSection course={course} />
                    <LearnSection course={course} />
                    <ConsultationSection courses={allCourses} />
                    <SimilarCoursesSection course={course} allCourses={allCourses} />

                </div>
            </main>
            <Footer />
        </div>
    );
};
