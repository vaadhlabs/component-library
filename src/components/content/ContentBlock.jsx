import React from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/**
 * Content Block Section Component.
 *
 * Strapi `layout.content` schema names the heading field `heading` but
 * earlier versions of this component (and its consumers) used `title`.
 * Accept both — `title` wins if both are passed — so neither rename
 * breaks rendering.
 */
const ContentBlock = ({
  title,
  heading,
  eyebrow,
  content,
  body, // legacy alias from older seed scripts; treated as `content`
  backgroundColor = '#ffffff',
  textColor = '#333333',
  maxWidth = 'medium',
  padding = 'medium',
  alignment = 'left',
  className = '',
}) => {
  const resolvedTitle = title || heading;
  const resolvedContent = content || body;
  const maxWidthMap = {
    small: '600px',
    medium: '800px',
    large: '1000px',
    full: '100%',
  };

  const paddingMap = {
    none: '0',
    small: '2rem',
    medium: '4rem',
    large: '6rem',
  };

  const containerStyle = {
    background: backgroundColor,
    color: textColor,
    padding: `${paddingMap[padding]} 2rem`,
  };

  const contentStyle = {
    maxWidth: maxWidthMap[maxWidth],
    margin: '0 auto',
    textAlign: alignment,
  };

  return (
    <section className={clsx('content-block-section', className)} style={containerStyle}>
      <div style={contentStyle}>
        {eyebrow && (
          <span style={{
            display: 'block',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#64748b',
            marginBottom: '0.75rem',
          }}>
            {eyebrow}
          </span>
        )}
        {resolvedTitle && (
          <h2 style={{
            fontSize: '1.875rem',
            marginBottom: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
          }}>
            {resolvedTitle}
          </h2>
        )}

        <div
          className="content-body"
          style={{
            lineHeight: 1.7,
            fontSize: '1.05rem',
          }}
        >
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              // The host page's CSS reset zeroes margins on <p>, <ul>, <ol>,
              // <li>, etc., which collapses every markdown paragraph into a
              // single visual blob. Re-establish per-element spacing here so
              // the component is self-contained and renders correctly even
              // under aggressive resets.
              p:  ({ node, ...p }) => <p  style={{ margin: '0 0 1rem'   }} {...p} />,
              ul: ({ node, ...p }) => <ul style={{ margin: '0 0 1rem', paddingLeft: '1.5rem' }} {...p} />,
              ol: ({ node, ...p }) => <ol style={{ margin: '0 0 1rem', paddingLeft: '1.5rem' }} {...p} />,
              li: ({ node, ...p }) => <li style={{ margin: '0 0 0.4rem' }} {...p} />,
              h3: ({ node, ...p }) => <h3 style={{ margin: '1.5rem 0 0.5rem', fontSize: '1.15rem', fontWeight: 600 }} {...p} />,
              h4: ({ node, ...p }) => <h4 style={{ margin: '1.25rem 0 0.4rem', fontSize: '1.05rem', fontWeight: 600 }} {...p} />,
              code: ({ node, inline, ...p }) =>
                inline
                  ? <code style={{ background: '#f1f5f9', padding: '0.1rem 0.35rem', borderRadius: 4, fontSize: '0.92em' }} {...p} />
                  : <code {...p} />,
              a: ({ node, ...p }) => (
                <a style={{ color: 'var(--gc-primary, #2563eb)', textDecoration: 'underline' }} {...p} />
              ),
            }}
          >
            {resolvedContent || ''}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default ContentBlock;

