import React from 'react';
import CodeBlock from '../components/cscode';
import { CodeProp } from '@/type/contenttype';

export default function CodePage({ title, description, code }: CodeProp) {
  return (
    <main className="p-5" style={{ overflowX: 'hidden' }}>
      <h1 className="mb-5">{title}</h1>
      <p>{description}</p>
       <CodeBlock
        title={code?.title || 'Untitled'}
        description={code?.description || ''}
        language={code?.language || 'javascript'}
        code={code?.code || '// No code provided'}
      />
      {/* <CodeBlock>
        <pre lang="javascript">{code}</pre>
      </CodeBlock> */}
    </main>
  );
}
