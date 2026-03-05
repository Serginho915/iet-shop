"use client";

import React from "react";
import { Header } from "@/components/header/Header/Header";
import { Footer } from "@/components/footer/Footer/Footer";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import { Post, getPostBySlug } from "@/lib/api";
import styles from "./BlogPage.module.scss";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { useTranslate } from "@/lib/useTranslate";

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
                    <div className={styles.header}>
                        <div className={styles.tags}>
                            {post.tags.map(tag => (
                                <Link key={tag.id} href={`/?blogTag=${tag.name}#blog`} className={styles.tag}>
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                        <h1 className={styles.title}>{post.title}</h1>
                        <div className={styles.meta}>
                            <span className={styles.author}>{post.author}</span>
                            {formattedDate && <span className={styles.date}>{formattedDate}</span>}
                        </div>
                    </div>

                    <div className={styles.content}>
                        {post.content}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
