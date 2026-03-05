"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "@/components/header/Header/Header";
import { Footer } from "@/components/footer/Footer/Footer";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from "./CoursePage.module.scss";
import { Course, getCourseBySlug } from "@/lib/api";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs/Breadcrumbs";

interface CoursePageProps {
    course?: Course;
    slug: string;
}

export const CoursePage = ({ course: initialCourse, slug }: CoursePageProps) => {
    const { t, lang } = useTranslate(translations);
    const [course, setCourse] = useState<Course | undefined>(initialCourse);

    useEffect(() => {
        if (!course) {
            getCourseBySlug(slug).then(setCourse);
        }
    }, [slug, course]);

    const breadcrumbs: BreadcrumbItem[] = [
        { label: t.course, href: "/#courses" },
        { label: course?.title || slug }
    ];

    const [formattedStart, setFormattedStart] = useState<string>("");

    useEffect(() => {
        if (course?.start) {
            const locale = lang === "bg" ? "bg-BG" : "en-GB";
            setFormattedStart(new Date(course.start).toLocaleDateString(locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
            }));
        }
    }, [course?.start, lang]);

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
                    {course.image && (
                        <div className={styles.imageContainer}>
                            <Image
                                src={course.image}
                                alt={course.title}
                                width={1200}
                                height={600}
                                className={styles.courseImage}
                                priority
                            />
                        </div>
                    )}
                    <h1>{course.title}</h1>
                    <p className={styles.description}>{course.description}</p>

                    <div className={styles.meta}>
                        {formattedStart && (
                            <span className={styles.metaItem}>📅 {t.start}: {formattedStart}</span>
                        )}
                        <span className={styles.metaItem}>⏱ {course.duration}</span>
                        <span className={styles.metaItem}>🎓 {course.type}</span>
                        <span className={styles.metaItem}>💶 {course.price} €</span>
                    </div>

                    <div className={styles.tags}>
                        {course.tags.map(tag => (
                            <Link key={tag.id} href={`/?courseTag=${tag.name}#courses`} className={styles.tag}>
                                {tag.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
