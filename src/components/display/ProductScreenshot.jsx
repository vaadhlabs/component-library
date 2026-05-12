import React from 'react';
import clsx from 'clsx';

const dotStyle = (color) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: color,
  display: 'inline-block',
});

const DashboardMockup = () => {
  const rows = [
    { tag: 'Bedrock PT', desc: 'Provisioned-throughput right-sized',   amount: '$342,800' },
    { tag: 'Routing',    desc: 'Opus → Sonnet on classify prompts',     amount: '$218,440' },
    { tag: 'Cache',      desc: 'Prompt prefix caching, 6 templates',    amount: '$94,210'  },
    { tag: 'Guard',      desc: 'Runaway loop intercepted (May 03)',      amount: '$48,720'  },
  ];

  return (
    <div style={{ background: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1rem', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
        <span style={dotStyle('#ef4444')} />
        <span style={dotStyle('#eab308')} />
        <span style={dotStyle('#22c55e')} />
        <div style={{ marginLeft: '0.75rem', fontSize: '0.78rem', color: '#64748b', fontFamily: 'ui-monospace, monospace' }}>
          tensorcost.app / cfo-summary
        </div>
      </div>

      {/* Header row */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', fontWeight: 600 }}>
              Net savings — YTD
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem', letterSpacing: '-0.02em' }}>
              $1,284,520
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', fontWeight: 600 }}>
              Bill match
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#16a34a', marginTop: '0.2rem' }}>
              + 99.4%
            </div>
          </div>
        </div>

        {/* Mini sparkline */}
        <svg width="100%" height="48" viewBox="0 0 600 48" style={{ marginTop: '0.75rem' }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="tc-spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gc-primary, #4f46e5)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--gc-primary, #4f46e5)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,38 L40,32 L80,34 L120,28 L160,30 L200,22 L240,24 L280,16 L320,18 L360,12 L400,14 L440,8 L480,11 L520,5 L560,7 L600,2 L600,48 L0,48 Z"
            fill="url(#tc-spark)"
          />
          <path
            d="M0,38 L40,32 L80,34 L120,28 L160,30 L200,22 L240,24 L280,16 L320,18 L360,12 L400,14 L440,8 L480,11 L520,5 L560,7 L600,2"
            stroke="var(--gc-primary, #4f46e5)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Ledger rows */}
      <div style={{ padding: '0.5rem 0' }}>
        {rows.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.65rem 1.5rem',
              borderTop: i ? '1px solid #f1f5f9' : 'none',
              gap: '0.75rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                minWidth: '92px',
                fontSize: '0.7rem',
                padding: '0.18rem 0.5rem',
                borderRadius: '4px',
                background: '#eef2ff',
                color: 'var(--gc-primary, #4f46e5)',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {row.tag}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#334155', flex: 1 }}>{row.desc}</span>
            <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {row.amount}
            </span>
          </div>
        ))}
      </div>

      {/* Footer hash row */}
      <div
        style={{
          padding: '0.7rem 1.5rem',
          borderTop: '1px solid #e5e7eb',
          background: '#f8fafc',
          fontSize: '0.72rem',
          color: '#64748b',
          fontFamily: 'ui-monospace, monospace',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>ledger-chain: ok</span>
        <span>a3f2c9b8…0f12</span>
      </div>
    </div>
  );
};

const ProductScreenshot = ({
  eyebrow,
  title = 'What you see on day one',
  body,
  image,
  alt,
  caption,
  variant = 'split',
  useMockup = true,
  className,
}) => {
  const sectionStyle = {
    background: '#f8fafc',
    padding: '5rem 2rem',
  };

  const innerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    ...(variant === 'split'
      ? {
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '4rem',
          alignItems: 'center',
        }
      : {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }),
  };

  const eyebrowStyle = {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    fontWeight: 600,
    color: '#64748b',
    marginBottom: '0.75rem',
    display: 'block',
  };

  const titleStyle = {
    fontSize: '1.875rem',
    fontWeight: 700,
    letterSpacing: '-0.015em',
    color: '#0f172a',
    lineHeight: 1.2,
    marginBottom: '1rem',
    margin: '0 0 1rem',
  };

  const bodyStyle = {
    fontSize: '1.05rem',
    lineHeight: 1.6,
    color: '#334155',
    margin: 0,
  };

  const textColStyle =
    variant === 'centered'
      ? { textAlign: 'center', marginBottom: '2.5rem', maxWidth: '640px' }
      : {};

  const frameStyle = {
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08), 0 4px 10px rgba(15, 23, 42, 0.04)',
    overflow: 'hidden',
    background: '#fff',
    ...(variant === 'centered' ? { width: '100%', maxWidth: '900px' } : {}),
  };

  const captionStyle = {
    fontSize: '0.8rem',
    color: '#64748b',
    marginTop: '0.75rem',
    textAlign: 'center',
    fontStyle: 'italic',
  };

  const showMockup = !image && useMockup;

  return (
    <section style={sectionStyle} className={clsx('product-screenshot', className)}>
      <div style={innerStyle}>
        {/* Text column */}
        <div style={textColStyle}>
          {eyebrow && <span style={eyebrowStyle}>{eyebrow}</span>}
          {title && <h2 style={titleStyle}>{title}</h2>}
          {body && <p style={bodyStyle}>{body}</p>}
        </div>

        {/* Image column */}
        <div>
          <div style={frameStyle}>
            {image ? (
              <img src={image} alt={alt || title} style={{ width: '100%', display: 'block' }} />
            ) : showMockup ? (
              <DashboardMockup />
            ) : null}
          </div>
          {caption && <p style={captionStyle}>{caption}</p>}
        </div>
      </div>
    </section>
  );
};

export default ProductScreenshot;
