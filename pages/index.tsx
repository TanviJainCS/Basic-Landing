import { GetStaticProps } from 'next';
import Stack, { fetchBlogs } from '@/lib/contentstack';
import { Banner } from '@/components/banner';
import { BlogSection } from '@/components/blog';
import { CTA } from '@/components/cta';

type Blog = {
  title: string;
  url: string;
  date: string;
  blog_image: { url: string };
  body: string;
};

type ComponentBlock =
  | { hero_banner: { banner_title: string; banner_description: string } }
  | { blog: { title: string; featured_blog?: Blog[] } }
  | { cta: { cta_title: string; cta_description: string; link?: any; link_get_started?: any } };

type PageProps = {
  page: {
    title: string;
    page_components: ComponentBlock[];
  };
  blogs: Blog[];
};

export default function Home({ page, blogs }: PageProps) {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
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
