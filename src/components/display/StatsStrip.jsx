import React from 'react';
import clsx from 'clsx';

const StatsStrip = ({ title, subtitle, stats = [], variant = 'light', className }) => {
  const isDark = variant === 'dark';

  const sectionStyle = {
    padding: '4rem 2rem',
    background: isDark ? '#0f172a' : '#f8fafc',
    color: isDark ? '#f8fafc' : '#0f172a',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 700,
    margin: '0 0 0.5rem',
    letterSpacing: '-0.015em',
  };

  const subtitleStyle = {
    fontSize: '1rem',
    opacity: 0.7,
    margin: 0,
  };

  const gridStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(2rem, 5vw, 5rem)',
    flexWrap: 'wrap',
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const statStyle = {
    textAlign: 'center',
  };

  const valueStyle = {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.02em',
    color: isDark ? '#fff' : 'var(--gc-primary, #4f46e5)',
  };

  const suffixStyle = {
    fontSize: '60%',
    opacity: 0.7,
    marginLeft: '0.15em',
  };

  const labelStyle = {
    fontSize: '0.85rem',
    opacity: 0.7,
    marginTop: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 500,
  };

  return (
    <section style={sectionStyle} className={clsx('stats-strip', className)}>
      {(title || subtitle) && (
        <div style={headerStyle}>
          {title && <h2 style={titleStyle}>{title}</h2>}
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </div>
      )}
      <div style={gridStyle}>
        {stats.map((stat, i) => (
          <div key={i} style={statStyle}>
            <div style={valueStyle}>
              {stat.value}
              {stat.suffix && <span style={suffixStyle}>{stat.suffix}</span>}
            </div>
            <div style={labelStyle}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
