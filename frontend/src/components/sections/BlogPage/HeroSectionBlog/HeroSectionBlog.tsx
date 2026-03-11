import React from 'react';
import { Post } from '@/lib/api';
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import Image from 'next/image';
import styles from './HeroSectionBlog.module.scss';

import { useLanguage } from "@/lib/LanguageContext";

interface HeroSectionBlogProps {
  post: Post;
  formattedDate: string;
}

const asText = (value: unknown, lang: "en" | "bg") => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const localized = value as { en?: string; bg?: string };
    return (lang === "bg" ? localized.bg : localized.en) || localized.en || localized.bg || "";
  }
  return "";
};

export const HeroSectionBlog = ({ post, formattedDate }: HeroSectionBlogProps) => {
  const { lang } = useLanguage();
  const title = asText(lang === 'bg' ? post.title_bg || post.title : post.title_en || post.title, lang);

  return (
    <div className={styles.header}>
      <div className={styles.imageWrapper}>
        <Image
          src={post.picture || '/default-blog-image.jpg'}
          alt={title || ""}
          width={1200}
          height={600}
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.metaRow}>
        <div className={styles.tags}>
          {post.tags.map(tag => {
            const tagName = asText(lang === 'bg' ? tag.name_bg || tag.name : tag.name_en || tag.name, lang);
            return (
              <Link key={tag.id} href={`/?blogTag=${tagName}#blog`} className={styles.tag}>
                {tagName}
              </Link>
            );
          })}
        </div>
        <div className={styles.authorMeta}>
          <span className={styles.author}>{post.author}</span>
          {formattedDate && <span className={styles.date}>• {formattedDate}</span>}
        </div>
      </div>
    </div>
  );
};
