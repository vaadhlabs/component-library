import React from 'react';
import clsx from 'clsx';
import * as Icons from 'lucide-react';
import MarkdownRichText from '../content/MarkdownRichText';

// Maps the semantic lowercase icon names used by the marketing seed to their
// PascalCase lucide-react export names. PascalCase names passed directly (e.g.
// "DollarSign") still work via the fallback lookup below.
const ICON_ALIASES = {
  cost:       'DollarSign',
  gpu:        'Cpu',
  cpu:        'Cpu',
  shield:     'Shield',
  sync:       'RefreshCw',
  ledger:     'FileCheck2',
  lightbulb:  'Lightbulb',
  cfo:        'PieChart',
  route:      'GitBranch',
  cache:      'Database',
  throughput: 'Gauge',
  forecast:   'LineChart',
  alert:      'AlertTriangle',
  platform:   'Server',
  ml:         'BrainCircuit',
  finance:    'Receipt',
};

/**
 * Feature Grid Section Component
 */
const FeatureGrid = ({
  title,
  subtitle,
  columns = '3',
  features = [],
  backgroundColor = '#f8f9fa',
  className = '',
}) => {
  const colCount = parseInt(columns, 10);

  const containerStyle = {
    background: backgroundColor,
    padding: '4rem 2rem',
  };

  const gridStyle = {
    display: 'grid',
    // auto-fit + min() collapses gracefully from the requested colCount on
    // wide viewports all the way down to a single column on mobile.
    gridTemplateColumns: `repeat(auto-fit, minmax(min(260px, 100%), 1fr))`,
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  return (
    <section className={clsx('feature-grid-section', className)} style={containerStyle}>
      {(title || subtitle) && (
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {title && <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{title}</h2>}
          {subtitle && (
            <MarkdownRichText style={{ fontSize: '1.2rem', opacity: 0.8 }}>
              {subtitle}
            </MarkdownRichText>
          )}
        </div>
      )}

      <div className="feature-grid" style={gridStyle}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id || index} {...feature} />
        ))}
      </div>
    </section>
  );
};

/**
 * Feature Card Component
 */
const FeatureCard = ({
  title,
  description,
  icon,
  image,
  link,
  linkText = 'Learn more',
}) => {
  const imageUrl = image?.data?.attributes?.url || image?.url;
  const resolvedIconName = icon && (ICON_ALIASES[icon] || icon);
  const IconComponent = resolvedIconName && Icons[resolvedIconName];

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '10px',
    padding: '2rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 1px rgba(15, 23, 42, 0.03)',
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
    cursor: link ? 'pointer' : 'default',
  };

  const handleClick = () => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <div 
      className="feature-card" 
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04)';
        e.currentTarget.style.borderColor = '#cbd5e1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 1px rgba(15, 23, 42, 0.03)';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}
    >
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title}
          style={{ 
            width: '100%', 
            height: '150px', 
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        />
      )}

      {IconComponent && !imageUrl && (
        <div style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--gc-gradient-from, #6366f1), var(--gc-gradient-to, #4f46e5))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}>
          <IconComponent size={28} color="#fff" />
        </div>
      )}

      {title && (
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>
          {title}
        </h3>
      )}

      {description && (
        <MarkdownRichText
          style={{
            color: '#666',
            lineHeight: 1.6,
            marginBottom: link ? '1rem' : 0,
          }}
          components={{
            a: ({ node, ...p }) => (
              <a
                {...p}
                style={{ color: 'var(--gc-primary, #2563eb)', textDecoration: 'underline' }}
                onClick={(e) => {
                  if (typeof p.onClick === 'function') p.onClick(e);
                  e.stopPropagation();
                }}
              />
            ),
          }}
        >
          {description}
        </MarkdownRichText>
      )}

      {link && (
        <a 
          href={link}
          style={{ 
            color: '#4f46e5', 
            textDecoration: 'none',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {linkText} →
        </a>
      )}
    </div>
  );
};

export default FeatureGrid;

