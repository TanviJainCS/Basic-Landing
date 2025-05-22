import styles from '../styles/Banner.module.css';
import Image from 'next/image';
import BG1 from '../public/Background1.svg';

export const Banner = ({ banner_title, banner_description }: { banner_title: string; banner_description: string }) => (
  <section className={styles.section}>
    <div className={styles.bannerBackgroundWrapper}>
      <Image
        src={BG1}
        alt="Banner Background"
        layout="fill"
        objectFit="contain"
        objectPosition="top right"
        priority
      />
    </div>

    {/* Content */}
    <div className={styles.container}>
      <h1 className={styles.title}>{banner_title}</h1>
      <p className={styles.description}>{banner_description}</p>
    </div>
  </section>
);
