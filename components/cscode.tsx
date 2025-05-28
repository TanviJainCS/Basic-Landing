import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; 
import 'highlight.js/lib/common';
import { CodeProp } from '@/type/contenttype';

function splitHtmlContent(html: string) {
  const match = html.match(/<pre>([\s\S]*?)<\/pre>/i);
  if (!match) return { before: html, codeHtml: '', after: '' };

  const [fullMatch, codeContent] = match;
  const index = html.indexOf(fullMatch);
  return {
    before: html.slice(0, index),
    codeHtml: codeContent,
    after: html.slice(index + fullMatch.length),
  };
}

function decodeAndHighlight(codeHtml: string, language: string) {
  const decoded = codeHtml
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const highlighted = hljs.highlight(decoded.trim(), { language }).value;
  return { highlighted, raw: decoded.trim() };
}

export default function CodeBlock({ title, description, language, code }: CodeProp) {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [rawCode, setRawCode] = useState('');
  const [copied, setCopied] = useState(false);

  const [beforeHtml, setBeforeHtml] = useState('');
  const [afterHtml, setAfterHtml] = useState('');

  useEffect(() => {
    const { before, codeHtml, after } = splitHtmlContent(code);
    const { highlighted, raw } = decodeAndHighlight(codeHtml, language);

    setBeforeHtml(before);
    setHighlightedCode(highlighted);
    setRawCode(raw);
    setAfterHtml(after);
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rawCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden my-10">
      {/* Optional title/description */}
      {title && (
        <div className="px-6 py-4 bg-gray-50">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      )}

      {/* Before RTE content */}
      <div
        className="prose max-w-none px-6 py-4"
        dangerouslySetInnerHTML={{ __html: beforeHtml }}
      />

      {/* Code block */}
      {highlightedCode && (
        <div className="relative bg-[#f6f8fa] rounded-lg overflow-hidden mx-6 mb-6">
          <div className="flex justify-between items-center bg-[#dfe3e6] px-4 py-2 text-xs font-medium text-gray-700">
            <span className="uppercase tracking-wide">{language}</span>
            <button
              onClick={copyToClipboard}
              className="text-xs bg-white hover:bg-gray-200 border border-gray-300 rounded px-2 py-1"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="m-0 overflow-x-auto text-sm leading-relaxed p-4">
            <code
              // className={`hljs language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>
      )}

      {/* After RTE content */}
      <div
        className="prose max-w-none px-6 pb-6"
        dangerouslySetInnerHTML={{ __html: afterHtml }}
      />
    </div>
  );
}
