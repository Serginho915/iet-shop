import React from 'react';
import { Post } from '@/lib/api';
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import Image from 'next/image';
import styles from './HeroSectionBlog.module.scss';

interface HeroSectionBlogProps {
  post: Post;
  formattedDate: string;
}

export const HeroSectionBlog = ({ post, formattedDate }: HeroSectionBlogProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.imageWrapper}>
        <Image
          src={post.picture || '/default-blog-image.jpg'}
          alt={post.title}
          width={1200}
          height={600}
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.metaRow}>
        <div className={styles.tags}>
          {post.tags.map(tag => (
            <Link key={tag.id} href={`/?blogTag=${tag.name}#blog`} className={styles.tag}>
              {tag.name}
            </Link>
          ))}
        </div>
        <div className={styles.authorMeta}>
          <span className={styles.author}>{post.author}</span>
          {formattedDate && <span className={styles.date}>• {formattedDate}</span>}
        </div>
      </div>
    </div>
  );
};
