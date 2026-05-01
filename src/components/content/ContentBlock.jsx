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
        {resolvedTitle && (
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '1.5rem',
            fontWeight: 700,
          }}>
            {resolvedTitle}
          </h2>
        )}

        <div
          className="content-body"
          style={{
            lineHeight: 1.8,
            fontSize: '1.1rem',
          }}
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {resolvedContent || ''}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default ContentBlock;

