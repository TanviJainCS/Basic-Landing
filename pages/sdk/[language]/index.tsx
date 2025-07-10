import { GetStaticPaths, GetStaticProps } from "next";
import Stack from "@/lib/contentstack";
import { highlightHtml } from "@/lib/highlightHtml"; // rehype-based
import "highlight.js/styles/github.css";
import CodeBlock from "@/components/cscode";
import { CodeProp } from "@/type/contenttype";

const languages = ["java", "typescript"];

export default function SDKPage({ codeBlock }: CodeProp) {
  console.log(codeBlock);

  return (
    <main className="px-9 py-9 w-[85%] flex justify-center mx-auto">
      <CodeBlock
        title={null}
        description={null}
        language={codeBlock.language}
        code={codeBlock.code}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const language = params?.language as string;
  const urlPath = `/sdk/${language}`;

  const result = await Stack.ContentType("page")
    .Query()
    .where("url", urlPath)
    .toJSON()
    .find();

  const [entry] = result[0];
  if (!entry) return { notFound: true };

  const codeblock = entry.page_components.find(
    (b: any) => b.codeblock
  )?.codeblock;
  if (!codeblock || !codeblock.code) return { notFound: true };

  const highlightedHtml = await highlightHtml(codeblock.code);

  return {
    props: {
      codeBlock: {
        title: codeblock.title ?? "",
        description: codeblock.description ?? "",
        language,
        code: highlightedHtml,
      },
    },
  };
};
