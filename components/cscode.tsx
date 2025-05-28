import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';
import 'highlight.js/lib/common';
import { CodeProp } from '@/type/contenttype';
//import '../styles/cscode.css'; // import at the top


// function stripHtmlTags(html: string): string {
//   let stripped = html.replace(/<\/?pre>/gi, '');
//   const textarea = document.createElement('textarea');
//   textarea.innerHTML = stripped;
//   const decoded = textarea.value;
//   return decoded.replace(/<br\s*\/?>/gi, '\n');
// }

export default function CodeBlock({ title, description, language, code }: CodeProp) {
  //const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState('');
   var rawCode;
 
  useEffect(() => {
    const result = hljs.highlight(code.trim(), { language }).value;
    setHighlighted(code);
  }, [code, language]);

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(code.trim()).then(() => {
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000);
  //   });
  // };

  return (
    <div>
        <div>
        <pre
        dangerouslySetInnerHTML={{ __html: highlighted}}
      />
      </div>

    </div>
  );
}
