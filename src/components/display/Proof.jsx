import React from 'react';
import clsx from 'clsx';
import MarkdownRichText from '../content/MarkdownRichText';

const Proof = ({
  title = 'Verify it yourself.',
  body,
  ctaText,
  ctaLink,
  command = '$ sha256sum savings-ledger.csv',
  output = 'a3f2c9b88e1d4f6a9c0b5d8e72f1a4b6c8d9e0f12 savings-ledger.csv',
  variant = 'split',
  className,
}) => {
  const sectionStyle = {
    padding: '4rem 2rem',
    background: '#0b1220',
    color: '#e2e8f0',
  };

  const innerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    ...(variant === 'split'
      ? {
          display: 'grid',
          // auto-fit collapses to a single column when viewport < ~720px
          // so the terminal block and copy stack instead of being squeezed
          // into 150-px-wide columns on mobile.
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }
      : {
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
        }),
  };

  const terminalStyle = {
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '10px',
    padding: '1.25rem 1.5rem',
    fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
    fontSize: '0.85rem',
    lineHeight: 1.6,
    minWidth: 0,
  };

  const dotsStyle = {
    display: 'flex',
    gap: '0.4rem',
    marginBottom: '0.75rem',
  };

  const copyBlockStyle = {
    minWidth: 0,
  };

  const titleStyle = {
    fontSize: 'clamp(1.4rem, 4vw, 1.75rem)',
    fontWeight: 700,
    marginBottom: '0.75rem',
    letterSpacing: '-0.015em',
    color: '#f8fafc',
    lineHeight: 1.2,
    margin: '0 0 0.75rem',
  };

  const bodyStyle = {
    fontSize: '1rem',
    lineHeight: 1.65,
    opacity: 0.85,
    marginBottom: '1.5rem',
    margin: '0 0 1.5rem',
  };

  const ctaStyle = {
    display: 'inline-flex',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    border: '1px solid var(--gc-primary, #38bdf8)',
    color: 'var(--gc-primary, #38bdf8)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
  };

  return (
    <section style={sectionStyle} className={clsx('proof', className)}>
      <div style={innerStyle}>
        <div style={terminalStyle}>
          <div style={dotsStyle}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          </div>
          <div>
            <span style={{ color: '#64748b' }}>$ </span>
            <span style={{ color: '#e2e8f0' }}>{command.replace(/^\$\s*/, '')}</span>
          </div>
          <div style={{ color: '#94a3b8', marginTop: '0.5rem', wordBreak: 'break-all' }}>
            {output}
          </div>
        </div>
        <div style={copyBlockStyle}>
          <h2 style={titleStyle}>{title}</h2>
          {body && (
            <MarkdownRichText
              style={bodyStyle}
              components={{
                a: ({ node, ...p }) => (
                  <a
                    {...p}
                    style={{
                      color: 'var(--gc-primary, #38bdf8)',
                      textDecoration: 'underline',
                    }}
                  />
                ),
              }}
            >
              {body}
            </MarkdownRichText>
          )}
          {ctaText && ctaLink && (
            <a href={ctaLink} style={ctaStyle}>
              {ctaText} →
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Proof;
