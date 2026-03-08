"use client";

import React from "react";
import { Header } from "@/components/header/Header/Header";
import { Footer } from "@/components/footer/Footer/Footer";
import { Post, getPostBySlug } from "@/lib/api";
import styles from "./BlogPage.module.scss";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { useTranslate } from "@/lib/useTranslate";
import { HeroSectionBlog } from "@/components/sections/BlogPage/HeroSectionBlog/HeroSectionBlog";

const translations = {
    en: { blog: "Blog" },
    bg: { blog: "Блог" }
};

interface BlogPageProps {
    post?: Post;
    slug: string;
}

export const BlogPage = ({ post: initialPost, slug }: BlogPageProps) => {
    const { t, lang } = useTranslate(translations);
    const [post, setPost] = React.useState<Post | undefined>(initialPost);

    React.useEffect(() => {
        if (!post) {
            getPostBySlug(slug).then(setPost);
        }
    }, [slug, post]);

    const breadcrumbs: BreadcrumbItem[] = [
        { label: t.blog, href: "/#blog" },
        { label: post?.title || slug }
    ];

    const [formattedDate, setFormattedDate] = React.useState<string>("");

    React.useEffect(() => {
        if (post?.created_at) {
            const locale = lang === "bg" ? "bg-BG" : "en-GB";
            setFormattedDate(new Date(post.created_at).toLocaleDateString(locale, {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }));
        }
    }, [post?.created_at, lang]);

    if (!post) {
        return (
            <div className={styles.blogPageWrapper}>
                <Header />
                <main className={styles.blogPage}>
                    <div className={styles.container}>
                        <Breadcrumbs items={breadcrumbs} />
                        <div style={{ padding: '40px 0', textAlign: 'center' }}>Loading post data...</div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.blogPageWrapper}>
            <Header />
            <main className={styles.blogPage}>
                <div className={styles.container}>
                    <Breadcrumbs items={breadcrumbs} />

                    <HeroSectionBlog
                        post={post}
                        formattedDate={formattedDate}
                    />

                    <div className={styles.content}>
                        {post.content}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
