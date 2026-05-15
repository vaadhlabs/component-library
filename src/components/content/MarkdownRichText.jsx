import React from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/** Shared markdown element styling (matches ContentBlock). */
export const defaultMarkdownComponents = {
  p: ({ node, ...p }) => <p style={{ margin: '0 0 1rem' }} {...p} />,
  ul: ({ node, ...p }) => <ul style={{ margin: '0 0 1rem', paddingLeft: '1.5rem' }} {...p} />,
  ol: ({ node, ...p }) => <ol style={{ margin: '0 0 1rem', paddingLeft: '1.5rem' }} {...p} />,
  li: ({ node, ...p }) => <li style={{ margin: '0 0 0.4rem' }} {...p} />,
  h3: ({ node, ...p }) => (
    <h3 style={{ margin: '1.5rem 0 0.5rem', fontSize: '1.15rem', fontWeight: 600 }} {...p} />
  ),
  h4: ({ node, ...p }) => (
    <h4 style={{ margin: '1.25rem 0 0.4rem', fontSize: '1.05rem', fontWeight: 600 }} {...p} />
  ),
  code: ({ node, inline, ...p }) =>
    inline ? (
      <code
        style={{ background: '#f1f5f9', padding: '0.1rem 0.35rem', borderRadius: 4, fontSize: '0.92em' }}
        {...p}
      />
    ) : (
      <code {...p} />
    ),
  a: ({ node, ...p }) => (
    <a style={{ color: 'var(--gc-primary, #2563eb)', textDecoration: 'underline' }} {...p} />
  ),
};

/**
 * Renders a CMS string as markdown + optional raw HTML (via rehype-raw),
 * including clickable links. Use where plain `{text}` inside a paragraph hid anchors.
 */
const MarkdownRichText = ({ children, className, style, components }) => {
  const merged =
    components === undefined
      ? defaultMarkdownComponents
      : { ...defaultMarkdownComponents, ...components };

  return (
    <div className={clsx('markdown-rich-text', className)} style={style}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={merged}>
        {children || ''}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRichText;
