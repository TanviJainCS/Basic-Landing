import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';
import 'highlight.js/lib/common';
import { useRouter } from 'next/router';
import { CodeProp } from '@/type/contenttype';

const languages = ['java', 'typescript'];

function decodeHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export default function CodeBlock({ title, description, language, code }: CodeProp) {
  const router = useRouter();
  const currentLang = (router.query.language as string) || languages[0];
  const [copied, setCopied] = useState(false);

  const parts = [];
  const regex = /<pre>([\s\S]*?)<\/pre>/gi;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'html',
        content: code.slice(lastIndex, match.index),
      });
    }

    parts.push({
      type: 'code',
      content: match[1],
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < code.length) {
    parts.push({
      type: 'html',
      content: code.slice(lastIndex),
    });
  }

  const highlightCode = (codeStr: string) => {
    const decoded = decodeHtml(codeStr).trim();
    try {
      return hljs.highlight(decoded, { language: currentLang }).value;
    } catch {
      return decoded
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      {title && (
        <div className="px-6 py-4 bg-gray-50">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      )}

      {parts.map((part, idx) => {
        if (part.type === 'html') {
          return (
            <div
              key={`html-${idx}`}
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          );
        }
        if (part.type === 'code') {
          const highlighted = highlightCode(part.content);
          const rawText = decodeHtml(part.content).trim();
          return (
            <div
              key={`code-${idx}`}
              className="relative bg-[#f6f8fa] overflow-hidden"
              style={{borderRadius:"12px"}}
            >
              <div className="flex justify-end gap-[5px] bg-[#cdd8e8] p-8"
              style={{padding:"8px"}}>
                <div>
                  <select
                    value={currentLang}
                    onChange={(e) => router.push(`/sdk/${e.target.value}`)}
                    style={{padding:"2px"}}
  
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => copyToClipboard(rawText)}
                  style={{padding:"2px"}}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre style={{paddingLeft:"12px"}}>
                <code dangerouslySetInnerHTML={{ __html: highlighted }} />
              </pre>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
