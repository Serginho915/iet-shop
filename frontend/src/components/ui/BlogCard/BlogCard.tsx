"use client";

import React from "react";
import styles from "./BlogCard.module.scss";
import { IconArrowUpRight } from "@/components/icons";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import { useRouter } from 'next/navigation';
import { Tag } from "@/lib/api";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { useBlog } from "@/lib/BlogContext";
import { Post } from "@/lib/api";

export interface BlogCardProps {
  id: number;
  tags: Tag[];
  author: string;
  title: string;
  excerpt?: string;
  slug: string;
  created_at: string;
  picture?: string;
  fullPost?: Post;
}

export const BlogCard = ({
  tags,
  author,
  title,
  excerpt,
  slug,
  created_at,
  picture,
  fullPost,
}: BlogCardProps) => {
  const router = useRouter();
  const { lang } = useLanguage();
  const { setSelectedBlog } = useBlog();

  const handleCardClick = () => {
    if (fullPost) {
      setSelectedBlog(fullPost);
    }
    router.push(`/${lang}/blog/${slug}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={styles.top}>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag.id} className={styles.tag}>
              {tag.name}
            </span>
          ))}
        </div>
        <Link
          href={`/blog/${slug}`}
          className={styles.actionLink}
          aria-label="Read full post"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.arrowCircle}>
            <IconArrowUpRight className={styles.arrowIcon} />
          </div>
        </Link>
      </div>

      <div className={styles.imageWrapper}>
        {picture ? (
          <Image
            src={picture.startsWith('http') ? picture : `/${picture}`}
            alt={title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 509px"
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.authorLabel}>{author}</div>
        <h4 className={styles.title}>{title}</h4>
        {excerpt && <p className={styles.description}>{excerpt}</p>}
      </div>
    </div>
  );
};
