"use client";

import React from "react";
import styles from "./BlogCard.module.scss";
import { IconHelpBtn } from "@/components/icons";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import { useRouter } from 'next/navigation';
import { Tag } from "@/lib/api";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export interface BlogCardProps {
  id: number;
  tags: Tag[];
  author: string;
  title: string;
  excerpt?: string;
  slug: string;
  created_at: string;
  picture?: string;
}

export const BlogCard = ({
  tags,
  author,
  title,
  excerpt,
  slug,
  created_at,
  picture,
}: BlogCardProps) => {
  const router = useRouter();
  const { lang } = useLanguage();

  const handleCardClick = () => {
    router.push(`/${lang}/blog/${slug}`);
  };

  const [formattedDate, setFormattedDate] = React.useState<string>("");

  React.useEffect(() => {
    if (created_at) {
      const locale = lang === "bg" ? "bg-BG" : "en-GB";
      setFormattedDate(new Date(created_at).toLocaleDateString(locale));
    }
  }, [created_at, lang]);

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
          <IconHelpBtn />
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
        <div className={styles.meta}>
          <span className={styles.author}>{author}</span>
          {formattedDate && <span className={styles.date}>{formattedDate}</span>}
        </div>
        <h4 className={styles.title}>{title}</h4>
        {excerpt && <p className={styles.description}>{excerpt}</p>}
      </div>
    </div>
  );
};
