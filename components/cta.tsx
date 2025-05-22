import BG1 from '../public/Background2.svg';
import styles from '../styles/CTA.module.css';
import Image from 'next/image';

const bgUrl = BG1.src;

type CTAProps = {
  cta_title: string;
  cta_description: string;
  link?: { title: string; href: string };
  link_get_started?: { title: string; href: string };
};

export const CTA = ({ cta_title, cta_description, link, link_get_started }: CTAProps) => (
  <section className={styles.section}>
    <div className={styles.bgWrapper}>
      <Image
        src={bgUrl}
        alt="Background"
        layout="fill"
        objectFit="cover"
        objectPosition="top left"
        priority
      />
    </div>

    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>{cta_title}</h2>
        <p className={styles.description}>{cta_description}</p>

        <div className={styles.links}>
          {link?.title && (
            <a href={link.href} className={styles.link}>
              {link.title}
            </a>
          )}
          {link_get_started?.title && (
            <a href={link_get_started.href} className={styles.link}>
              {link_get_started.title}
            </a>
          )}
        </div>
      </div>
    </div>
  </section>
);
