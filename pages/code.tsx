import { GetStaticProps } from 'next';
import Stack from '@/lib/contentstack';
import Head from 'next/head';
import { CodeProp, PageProps } from '@/type/contenttype';
import CodeBlock from '@/components/cscode';

export default function CodePage({ code }: CodeProp) {
  return (
    <main className="p-5 space-y-6">
      <CodeBlock
        title={code.title}
        description={code.description}
        language={code.language}
        code={code.code}
      />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageResult = await Stack.ContentType('page')
    .Query()
    .where('url', '/')
    .toJSON()
    .find();

  const [entry] = pageResult[0];

  const codeBlock = entry.page_components.find(
    (block: any) => block.codeblock
  )?.codeblock || null;

  const richTextBlock = entry.page_components.find(
    (block: any) => block.rich_text
  )?.rich_text?.rich_text || '';

  return {
    props: {
      code: codeBlock,
      htmlContent: richTextBlock,
    },
    revalidate: 60,
  };
};
