import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';
import 'highlight.js/lib/common';
import { CodeProp } from '@/type/contenttype'; 

function stripHtmlTags(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}


export default function CodeBlock({ title, description, language, code }: CodeProp) {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState('');

useEffect(() => {
  if (!code) return;
  const rawCode = stripHtmlTags(code); 
  const result = hljs.highlight(rawCode.trim(), { language }).value;
  setHighlighted(result);
}, [code, language]);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  console.log(highlighted)

  return (
    <div className="card cs-code-block my-4">
      <div className="card-header bg-graphite text-white">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="m-0">{title}</h5>
            {description && <p className="mb-0 small">{description}</p>}
          </div>
          <button className="btn btn-sm btn-light" onClick={copyToClipboard}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="card-body p-0">
        <pre className="m-0 p-3 bg-light" dangerouslySetInnerHTML={{ __html: highlighted }} />
      </div>
    </div>
  );
}
