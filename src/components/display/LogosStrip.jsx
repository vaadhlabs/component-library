import React from 'react';
import clsx from 'clsx';

const LogosStrip = ({ title, subtitle, logos = [], variant = 'light', className }) => {
  const isMuted = variant === 'muted';

  const sectionStyle = {
    padding: '4rem 2rem',
    background: isMuted ? '#f8fafc' : '#ffffff',
    borderTop: isMuted ? 'none' : '1px solid #e5e7eb',
    borderBottom: isMuted ? 'none' : '1px solid #e5e7eb',
  };

  const containerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const eyebrowStyle = {
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#64748b',
    marginBottom: '0.4rem',
    margin: '0 0 0.4rem',
  };

  const subtitleStyle = {
    fontSize: '0.9rem',
    color: '#475569',
    marginBottom: '2rem',
    margin: '0 0 2rem',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
    marginTop: title ? '2rem' : 0,
  };

  return (
    <section style={sectionStyle} className={clsx('logos-strip', className)}>
      <div style={containerStyle}>
        {title && <p style={eyebrowStyle}>{title}</p>}
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        <div style={rowStyle}>
          {logos.map((logo, i) => (
            <LogoEntry key={i} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
};

const LogoEntry = ({ logo }) => {
  const { name, image, alt, outline, website } = logo;

  if (image) {
    const imgEl = (
      <HoverImg src={image} alt={alt || name} />
    );
    if (website) {
      return (
        <a href={website} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', lineHeight: 0 }}>
          {imgEl}
        </a>
      );
    }
    return imgEl;
  }

  if (outline) {
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px',
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
        borderRadius: '6px',
        border: '1px dashed #cbd5e1',
        background: '#ffffff',
        fontSize: '0.78rem',
        fontWeight: 500,
        letterSpacing: '0.05em',
        color: '#64748b',
        whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    );
  }

  return (
    <span style={{
      fontSize: '1rem',
      fontWeight: 600,
      color: '#334155',
      opacity: 0.85,
    }}>
      {name}
    </span>
  );
};

const HoverImg = ({ src, alt }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '32px',
        maxWidth: '140px',
        objectFit: 'contain',
        filter: hovered ? 'grayscale(0)' : 'grayscale(1)',
        opacity: hovered ? 1 : 0.7,
        transition: 'filter 0.2s ease, opacity 0.2s ease',
        display: 'block',
      }}
    />
  );
};

export default LogosStrip;
