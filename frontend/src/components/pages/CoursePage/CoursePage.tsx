"use client";

import React from "react";
import Image from "next/image";
import { Header } from "@/components/header/Header/Header";
import { Footer } from "@/components/footer/Footer/Footer";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from "./CoursePage.module.scss";
import { Course } from "@/lib/api";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs/Breadcrumbs";

interface CoursePageProps {
    course: Course;
}

export const CoursePage = ({ course }: CoursePageProps) => {
    const { t, lang } = useTranslate(translations);

    const breadcrumbs: BreadcrumbItem[] = [
        { label: t.course, href: "/#courses" },
        { label: course.title }
    ];

    const [formattedStart, setFormattedStart] = React.useState<string>("");

    React.useEffect(() => {
        if (course.start) {
            const locale = lang === "bg" ? "bg-BG" : "en-GB";
            setFormattedStart(new Date(course.start).toLocaleDateString(locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
            }));
        }
    }, [course.start, lang]);

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
