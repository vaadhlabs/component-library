import React from 'react';
import clsx from 'clsx';

const Guarantee = ({ badge, title, body, className }) => {
  const sectionStyle = {
    padding: '3rem 2rem',
    background: '#f8fafc',
  };

  const cardStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '2rem 2.25rem',
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
  };

  const badgeCircleStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'var(--gc-primary, #4f46e5)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    flexShrink: 0,
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const badgeTextStyle = {
    textTransform: 'uppercase',
    fontSize: '0.72rem',
    letterSpacing: '0.12em',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '0.5rem',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#0f172a',
    letterSpacing: '-0.015em',
    margin: '0 0 0.5rem',
  };

  const bodyStyle = {
    fontSize: '0.95rem',
    lineHeight: 1.65,
    color: '#334155',
    margin: 0,
    whiteSpace: 'pre-line',
  };

  return (
    <section style={sectionStyle} className={clsx('guarantee', className)}>
      <div style={cardStyle}>
        <div style={badgeCircleStyle}>✓</div>
        <div style={contentStyle}>
          {badge && <div style={badgeTextStyle}>{badge}</div>}
          {title && <h3 style={titleStyle}>{title}</h3>}
          {body && <p style={bodyStyle}>{body}</p>}
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
