import React from 'react';
import clsx from 'clsx';
import MarkdownRichText from './MarkdownRichText';

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
          <MarkdownRichText>{resolvedContent || ''}</MarkdownRichText>
        </div>
      </div>
    </section>
  );
};

export default ContentBlock;

