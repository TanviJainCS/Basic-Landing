import styles from '../styles/Banner.module.css';
import { Banner } from '@/type/contenttype';

export const Banner = ({ banner_title, banner_description }: Banner) => (
  <section className={styles.section}>
    <div className={styles.container}>
      <h1 className={styles.title}>{banner_title}</h1>
      <p className={styles.description}>{banner_description}</p>
    </div>
  </section>
);
