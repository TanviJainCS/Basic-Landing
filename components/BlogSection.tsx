import React from 'react';
import styles from '../styles/BlogSection.module.css';
import {BlogProps} from '@/type/ContentType';

export const BlogSection = ({ blogs }: BlogProps) => (
  <section className={styles.section}>
    <div className={styles.container}>
      <h2 className={styles.title}>Check out these related resources</h2>

      <div className={styles.blogGrid}>
        {blogs.map((blog, i) => (
          <div key={i} className={styles.blogCard}>
            <p className={styles.blogDate}>
              BLOG / {new Date(blog.date).toLocaleDateString('en-GB')}
            </p>
            <h3 className={styles.blogTitle}>
              {blog.body.replace(/<[^>]+>/g, '').slice(0, 100)}...
            </h3>
            <img src={blog.blog_image.url} alt={blog.title} className={styles.blogImage} />
          </div>
        ))}
      </div>
    </div>
  </section>
);
