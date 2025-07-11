import styles from '../styles/Banner.module.css';
import Link from 'next/link';
import { Banner } from '@/type/contenttype';

export const Banners = ({ banner_title, banner_description }: Banner) => (
  <section className={styles.section}>
    <div className={styles.container}>
      <h1 className={styles.title}>{banner_title}</h1>
      <div className={styles.row}>
        <p className={styles.description}>{banner_description}</p>
        <Link href="/sdk/java" className={styles.button}>
        SDKs
        </Link>
      </div>
    </div>
  </section>
);
