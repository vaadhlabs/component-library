import React from 'react';
import clsx from 'clsx';

const Comparison = ({ title, subtitle, leftLabel, rightLabel, rows = [], className }) => {
  const sectionStyle = {
    background: '#ffffff',
    padding: '4rem 2rem',
  };

  const containerStyle = {
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
    color: '#0f172a',
    margin: '0 0 0.5rem',
  };

  const subtitleStyle = {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0,
  };

  const tableStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
  };

  const leftHeaderStyle = {
    background: '#f8fafc',
    padding: '1rem 1.5rem',
    color: '#64748b',
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    borderBottom: '1px solid #e5e7eb',
    borderRight: '1px solid #e5e7eb',
  };

  const rightHeaderStyle = {
    background: '#f1f5f9',
    borderLeft: '3px solid var(--gc-primary, #4f46e5)',
    padding: '1rem 1.5rem',
    color: 'var(--gc-primary, #4f46e5)',
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    borderBottom: '1px solid #e5e7eb',
  };

  return (
    <section style={sectionStyle} className={clsx('comparison', className)}>
      <div style={containerStyle}>
        {(title || subtitle) && (
          <div style={headerStyle}>
            {title && <h2 style={titleStyle}>{title}</h2>}
            {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
          </div>
        )}
        <div style={tableStyle}>
          <div style={leftHeaderStyle}>{leftLabel}</div>
          <div style={rightHeaderStyle}>{rightLabel}</div>
          {rows.map((row, i) => {
            const isLast = i === rows.length - 1;
            const leftCellStyle = {
              padding: '1.25rem 1.5rem',
              color: '#64748b',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              borderRight: '1px solid #e5e7eb',
              borderBottom: isLast ? 'none' : '1px solid #e5e7eb',
            };
            const rightCellStyle = {
              padding: '1.25rem 1.5rem',
              color: '#0f172a',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              fontWeight: 500,
              borderBottom: isLast ? 'none' : '1px solid #e5e7eb',
            };
            return (
              <React.Fragment key={i}>
                <div style={leftCellStyle}>{row.left}</div>
                <div style={rightCellStyle}>{row.right}</div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Comparison;
