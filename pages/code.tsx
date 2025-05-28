import { GetStaticProps } from 'next';
import Stack from '@/lib/contentstack';
import { CodeProp } from '@/type/contenttype';
import CodeBlock from '@/components/cscode';

export default function CodePage({ code }: CodeProp) {
  return (
    <main>
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
    },
    revalidate: 60,
  };
};
