import React from 'react';
import { Post } from '@/lib/api';
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import styles from './HeroSectionBlog.module.scss';

interface HeroSectionBlogProps {
  post: Post;
  formattedDate: string;
}

export const HeroSectionBlog = ({ post, formattedDate }: HeroSectionBlogProps) => {
  return (
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
  );
};
