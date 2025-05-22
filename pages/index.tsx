import { GetStaticProps } from 'next';
import Stack, { fetchBlogs } from '@/lib/contentstack';
import { Banner } from '../components/Banner';
import { BlogSection } from '../components/BlogSection';
import { CTA } from '@/components/cta';
import BG1 from '../public/Background1.svg';
import BG2 from '../public/Background2.svg';
import Image from 'next/image';
import { PageProps } from '../type/contenttype';


export default function Home({ page, blogs }: PageProps) {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>

      <div className="bannerBackgroundWrapper">
        <Image
          src={BG1}
          alt="Banner Background"
          fill
          style={{ objectFit: 'contain', objectPosition: 'top right' }}
        />
      </div>

    
       
      {page.page_components.map((block, i) => {
         if ('hero_banner' in block) {
          return <Banner key={i} {...block.hero_banner} />;
        }
        if ('blog' in block) {
          return <BlogSection key={i} blogs={blogs} />;
        }
        if ('cta' in block) {
          return <CTA key={i} {...block.cta} />;
        }
        return null;
      })}
        <div className="bgWrapper">
        <Image
          src={BG2}
          alt="CTA Background"
          fill
         style={{ objectFit: 'cover' }}
         priority
        />
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageResult = await Stack.ContentType('page')
    .Query()
    .where('url', '/')
    .toJSON()
    .find();

  const blogs = await fetchBlogs(); 
  const [entry] = pageResult[0];

  return {
    props: {
      page: entry,
      blogs,
    },
    revalidate: 60,
  };
};
