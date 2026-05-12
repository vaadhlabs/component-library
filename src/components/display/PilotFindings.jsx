import React from 'react';
import clsx from 'clsx';

const PilotFindings = ({
  title = 'What a two-week pilot typically finds',
  subtitle,
  findings = [],
  footnote,
  cta,
  className,
}) => {
  const sectionStyle = {
    background: '#ffffff',
    padding: '4rem 2rem',
  };

  const innerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2.5rem',
  };

  const titleStyle = {
    fontSize: '1.875rem',
    fontWeight: 700,
    letterSpacing: '-0.015em',
    marginBottom: '0.5rem',
    color: '#0f172a',
    margin: '0 0 0.5rem',
  };

  const subtitleStyle = {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  };

  const cardStyle = {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
  };

  const rangeStyle = {
    display: 'block',
    fontSize: 'clamp(2rem, 3vw, 2.5rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    color: 'var(--gc-primary, #4f46e5)',
    marginBottom: '0.5rem',
  };

  const labelStyle = {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#0f172a',
    marginBottom: '0.5rem',
  };

  const noteStyle = {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: 1.5,
    marginTop: 'auto',
  };

  const footnoteStyle = {
    marginTop: '2rem',
    textAlign: 'center',
    fontSize: '0.825rem',
    fontStyle: 'italic',
    color: '#64748b',
    maxWidth: '720px',
    margin: '2rem auto 0',
  };

  const ctaStyle = {
    display: 'inline-flex',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--gc-primary, #4f46e5)',
    color: 'var(--gc-primary, #4f46e5)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
  };

  const ctaWrapStyle = {
    marginTop: '1rem',
    textAlign: 'center',
  };

  return (
    <section style={sectionStyle} className={clsx('pilot-findings', className)}>
      <div style={innerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{title}</h2>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </div>

        <div style={gridStyle}>
          {findings.map((finding, i) => (
            <div key={i} style={cardStyle}>
              <span style={rangeStyle}>{finding.range}</span>
              <div style={labelStyle}>{finding.label}</div>
              {finding.note && <p style={noteStyle}>{finding.note}</p>}
            </div>
          ))}
        </div>

        {footnote && <p style={footnoteStyle}>{footnote}</p>}

        {cta && cta.text && cta.link && (
          <div style={ctaWrapStyle}>
            <a href={cta.link} style={ctaStyle}>
              {cta.text} →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PilotFindings;
