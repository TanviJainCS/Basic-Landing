import { GetStaticPaths, GetStaticProps } from 'next';
import CodeBlock from '@/components/cscode';
import Stack from '@/lib/contentstack';
import { CodeProp } from '@/type/contenttype';

const languages = ['java', 'typescript']; 

export default function SDKPage({ codeBlock }: CodeProp) {
  console.log(codeBlock)

  return (
  <main className="px-9 py-9 w-[85%] flex justify-center mx-auto">
    <CodeBlock
          title={null}
          description={null}
          language={codeBlock.language}
          code={codeBlock.code}
        />
        </main>)}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = languages.map((language) => ({
    params: { language },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const language = params?.language as string;

  const urlPath = `/sdk/${language}`; 

  const result = await Stack.ContentType('page')
    .Query()
    .where('url', urlPath)
    .toJSON()
    .find();

  const [entry] = result[0];

  if (!entry) return { notFound: true };

  const codeBlock =
    entry.page_components.find((block: any) => block.codeblock)?.codeblock || null;

  return {
    props: {
      codeBlock,
    },
    revalidate: 60,
  };
};
