import { useState } from "react";
import { useRouter } from "next/router";
import { CodeProp } from "@/type/contenttype";

const languages = ["java", "typescript"];

function decodeHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export default function CodeBlock({
  title,
  description,
  language,
  code,
}: CodeProp) {
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
        type: "html",
        content: code.slice(lastIndex, match.index),
      });
    }

    parts.push({
      type: "code",
      content: match[0], // <pre>...</pre>
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < code.length) {
    parts.push({
      type: "html",
      content: code.slice(lastIndex),
    });
  }

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
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      )}

      {parts.map((part, idx) => {
        if (part.type === "html") {
          return (
            <div
              key={`html-${idx}`}
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          );
        }

        if (part.type === "code") {
          const rawText = decodeHtml(part.content);
          return (
            <div key={`code-${idx}`} className="mb-4 rounded">
              <div className="flex justify-end gap-[5px] bg-[#cdd8e8] p-2">
                <select
                  value={currentLang}
                  onChange={(e) => router.push(`/sdk/${e.target.value}`)}
                  className="p-1"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => copyToClipboard(rawText)}
                  className="p-1"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div
                className="p-3"
                dangerouslySetInnerHTML={{ __html: part.content }}
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
