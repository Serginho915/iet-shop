"use client";

import React, { useState, useRef, useEffect, Suspense } from 'react';
import styles from './BlogSection.module.scss';
import { BlogCard } from '@/components/ui/BlogCard/BlogCard';
import { CarouselNav } from '@/components/ui/CarouselNav/CarouselNav';
import { useTranslate } from "@/lib/useTranslate";
import { translationsTitle } from './translations';
import { useSearchParams } from 'next/navigation';
import { Post } from '@/lib/api';

interface BlogSectionProps {
    posts?: Post[];
}

const BlogContent = ({ posts = [] }: BlogSectionProps) => {
    const { t: tTitle } = useTranslate(translationsTitle);
    const searchParams = useSearchParams();

    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeTagName, setActiveTagName] = useState<string>("all");

    useEffect(() => {
        const tag = searchParams.get("blogTag");
        setActiveTagName(tag ?? "all");
    }, [searchParams]);


    const displayPosts = activeTagName === "all"
        ? posts
        : posts.filter(p => p.tags.some(tag => tag.name === activeTagName));

    const total = displayPosts.length - 1;

    const cardWidth = 509;
    const gap = 24;

    const scrollToStep = (index: number) => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: (cardWidth + gap) * index,
                behavior: 'smooth'
            });
        }
    };

    const handleNext = () => {
        if (total <= 0) return;
        const nextIndex = (activeIndex + 1) % (total);
        setActiveIndex(nextIndex);
        scrollToStep(nextIndex);
    };

    const handlePrev = () => {
        if (total <= 0) return;
        const prevIndex = (activeIndex - 1 + (total + 1)) % (total + 1);
        setActiveIndex(prevIndex);
        scrollToStep(prevIndex);
    };

    const handleGoTo = (index: number) => {
        setActiveIndex(index);
        scrollToStep(index);
    };

    return (
        <section id="blog" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <h2>
                        {tTitle.title} <span className={styles.infoBadge}>{tTitle.badge}</span>
                    </h2>
                    <CarouselNav
                        currentIndex={activeIndex}
                        totalSteps={total}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onGoTo={handleGoTo}
                    />
                </div>

                <div className={styles.scrollWrapper} ref={containerRef}>
                    <ul className={styles.blogList}>
                        {displayPosts.map((post) => (
                            <BlogCard
                                key={post.id}
                                id={post.id}
                                author={post.author}
                                title={post.title}
                                excerpt={post.content.length > 150 ? post.content.slice(0, 150) + "…" : post.content}
                                slug={post.slug}
                                tags={post.tags}
                                created_at={post.created_at}
                                picture={post.picture}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export const BlogSection = (props: BlogSectionProps) => {
    return (
        <Suspense fallback={<div>Loading blog...</div>}>
            <BlogContent {...props} />
        </Suspense>
    );
};