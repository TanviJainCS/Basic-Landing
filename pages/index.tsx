import { GetStaticProps } from "next";
import Stack, { fetchBlogs } from "@/lib/contentstack";
import { Banners } from "../components/banner";
import { BlogSection } from "../components/BlogSection";
import { CTA } from "@/components/cta";
import BG1 from "../public/Background1.svg";
import BG2 from "../public/Background2.svg";
import Image from "next/image";
import Head from "next/head";
import { ComponentBlock, PageProps } from "@/type/contenttype";
import CodeBlock from "../components/cscode";

export default function Home({ page, blogs, code }: PageProps) {
  const codeBlocks = page.modular_blocks
    ?.filter((block) => block.code_block)
    .map((block) => block.code_block);
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Thank you</title>
        <meta
          name="description"
          content="Thank you for your inquiry. A member of our sales team will be in touch to schedule a demo in the next business day."
        />
        <meta property="og:image" content="img" />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://www.contentstack.com/request-demo/thank-you"
        />
      </Head>
      <main style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="bannerBackgroundWrapper">
          <Image
            src={BG1}
            alt="Banner Background"
            fill
            style={{ objectFit: "contain", objectPosition: "top right" }}
          />
        </div>

        {page.page_components.map((block, i) => {
          if ("hero_banner" in block) {
            return <Banners key={i} {...block.hero_banner} />;
          }
          return null;
        })}

        <div className="relative z-0">
          <div className="absolute inset-0 -z-10 w-full h-full">
            <Image
              src={BG2}
              alt="Blog + CTA Background"
              fill
              style={{ objectFit: "cover", objectPosition: "bottom" }}
            />
          </div>

          {page.page_components.map((block, i) => {
            if ("blog" in block) {
              return <BlogSection key={`blog-${i}`} blogs={blogs} />;
            }
            if ("cta" in block) {
              return <CTA key={`cta-${i}`} {...block.cta} />;
            }
            return null;
          })}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageResult = await Stack.ContentType("page")
    .Query()
    .where("url", "/")
    .toJSON()
    .find();

  const blogs = await fetchBlogs();
  const [entry] = pageResult[0];
  // const codeBlock = entry.page_components.find(
  //     (block: any) => block.codeblock
  //   )?.codeblock || null;

  return {
    props: {
      page: entry,
      blogs,
      //code: codeBlock,
    },
    revalidate: 60,
  };
};
