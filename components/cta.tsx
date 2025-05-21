type CTAProps = {
  cta_title: string;
  cta_description: string;
  link?: { title: string; href: string };
  link_get_started?: { title: string; href: string };
};

export const CTA = ({ cta_title, cta_description, link, link_get_started }: CTAProps) => (
  <section style={{ padding: '4rem 2rem', background: 'linear-gradient(to right, #a855f7, #3b82f6)', color: '#fff' }}>
    <h2 >{cta_title}</h2>
    <p>{cta_description}</p>
    <div >
      {link?.title && <a href={link.href} style={{backgroundColor:'#ffff' ,padding:'8px',marginLeft: '1rem' }}>{link.title}</a>}
      {link_get_started?.title && <a href={link_get_started.href} style={{backgroundColor:'#ffff' ,padding:'8px',marginLeft: '1rem' }}>{link_get_started.title}</a>}
    </div>
  </section>
);
