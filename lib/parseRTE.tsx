import parse, { DOMNode, Element } from 'html-react-parser';
import CustomHeading from '@/components/custom';

export function parseRichText(html: string): React.ReactNode {
  return parse(html, {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === 'h2') {
          return (
            <CustomHeading>
              {domNode.children.map((child, i) => 'data' in child ? child.data : '')}
            </CustomHeading>
          );
        }

      }
    },
  });
}
