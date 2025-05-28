import BG1 from '../public/Background2.svg';
import styles from '../styles/CTA.module.css';
import { CTAProps } from '@/type/contenttype';

const bgUrl = BG1.src;
export const CTA = ({ cta_title, cta_description, link, link_get_started }: CTAProps) => (
  <section className={styles.section}>

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
