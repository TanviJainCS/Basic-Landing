
export type Banner ={
    banner_title: string; 
    banner_description: string;}

export type Blog = {
  title: string;
  url: string;
  date: string;
  blog_image: { url: string };
  body: string;
};

export type BlogProps = {
  blogs: Blog[];
};

export type CTAProps = {
  cta_title: string;
  cta_description: string;
  link?: { title: string; href: string };
  link_get_started?: { title: string; href: string };
};


export type ComponentBlock ={
  hero_banner: Banner;
  blog: Blog;
  cta: CTAProps;}


export type PageProps = {
  page: {
    title: string;
    page_components: ComponentBlock[];
  };
  blogs: BlogProps[];
};