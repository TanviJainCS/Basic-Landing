import { rehype } from "rehype";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

export async function highlightHtml(htmlString) {
  const processed = await rehype()
    .use(rehypeParse, { fragment: true })
    .use(() => (tree) => {
      for (const node of tree.children) {
        if (node.tagName === "pre") {
          const firstChild = node.children?.[0];

          // Convert <br> tags to newline text nodes
          if (firstChild?.tagName === "br") {
            node.children = [{ type: "text", value: "\n" }];
          } else if (
            firstChild?.type === "element" &&
            firstChild.tagName === "code"
          ) {
            // Normalize <br /> inside <code>
            firstChild.children = firstChild.children.flatMap((child) => {
              if (child.tagName === "br") {
                return { type: "text", value: "\n" };
              }
              return child;
            });
          } else if (
            firstChild?.type === "text" ||
            firstChild?.type === "element"
          ) {
            // Wrap in <code> if not present
            const rawText = extractTextContent(node.children);
            node.children = [
              {
                type: "element",
                tagName: "code",
                properties: { className: ["language-javascript"] }, // Default or detect dynamically
                children: [{ type: "text", value: rawText }],
              },
            ];
          }
        }
      }

      // Helper to flatten children to raw text
      function extractTextContent(children) {
        return children
          .map((child) => {
            if (child.type === "text") return child.value;
            if (child.tagName === "br") return "\n";
            if (child.children) return extractTextContent(child.children);
            return "";
          })
          .join("");
      }
    })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(htmlString);

  return processed.toString();
}
