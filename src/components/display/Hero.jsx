import React from 'react';
import clsx from 'clsx';
import Button from '../forms/Button';

/**
 * Hero Section Component
 *
 * Accepts props directly from Strapi's layout.hero component:
 *   title, subtitle, cta, secondaryCta, variant, gradientFrom, gradientTo, minHeight
 *
 * Also supports legacy props: primaryButton, secondaryButton, backgroundImage, etc.
 */
const Hero = ({
  title,
  subtitle,
  eyebrow = undefined,
  trustLine = undefined,
  // Strapi props
  cta,
  secondaryCta,
  variant = 'gradient',
  gradientFrom = '#6366F1',
  gradientTo = '#0EA5E9',
  minHeight = '80vh',
  // Legacy props
  primaryButton,
  secondaryButton,
  backgroundImage,
  backgroundVideo,
  alignment = 'center',
  height,
  overlay = true,
  overlayColor,
  textColor = '#ffffff',
  className = '',
}) => {
  // Resolve buttons: prefer Strapi cta/secondaryCta, fall back to legacy
  const resolvedPrimary = cta || primaryButton;
  const resolvedSecondary = secondaryCta || secondaryButton;

  // Resolve height
  const heightMap = { small: '40vh', medium: '60vh', large: '80vh', fullScreen: '100vh' };
  const resolvedMinHeight = height ? (heightMap[height] || height) : minHeight;

  // Build background based on variant
  // NOTE: React inline styles don't handle "background" shorthand with gradients.
  // Use backgroundImage for gradients and backgroundColor for solid colors.
  const variantStyles = {
    gradient: {
      backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
    },
    dark: {
      backgroundColor: '#111827',
    },
    light: {
      backgroundColor: '#f8fafc',
      color: '#111827',
    },
    wave: {
      backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
    },
    split: {
      backgroundColor: '#ffffff',
      color: '#111827',
    },
  };

  const variantStyle = variantStyles[variant] || variantStyles.gradient;
  const resolvedTextColor = variantStyle.color || textColor;

  const bgImageUrl = backgroundImage?.data?.attributes?.url || backgroundImage?.url;

  const containerStyle = {
    position: 'relative',
    minHeight: resolvedMinHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...variantStyle,
    ...(bgImageUrl ? {
      backgroundImage: `url(${bgImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    } : {}),
    color: resolvedTextColor,
  };

  const showOverlay = overlay && bgImageUrl;
  const resolvedOverlayColor = overlayColor || 'rgba(0,0,0,0.5)';

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    textAlign: alignment,
    maxWidth: '760px',
    padding: '2rem',
  };

  return (
    <section className={clsx('hero-section', `hero-${variant}`, className)} style={containerStyle}>
      {backgroundVideo && (
        <video
          autoPlay loop muted playsInline
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', objectFit: 'cover',
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {showOverlay && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: resolvedOverlayColor,
        }} />
      )}

      <div className="hero-content" style={contentStyle}>
        {eyebrow && (
          <p style={{
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: '0.78rem',
            fontWeight: 600,
            opacity: 0.85,
            marginBottom: '1rem',
            color: 'inherit',
          }}>
            {eyebrow}
          </p>
        )}

        {title && (
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 700,
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}>
            {title}
          </h1>
        )}

        {subtitle && (
          <p style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
            opacity: 0.88,
            marginBottom: '1.75rem',
            lineHeight: 1.55,
          }}>
            {subtitle}
          </p>
        )}

        {(resolvedPrimary || resolvedSecondary) && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: alignment,
            flexWrap: 'wrap',
          }}>
            {resolvedPrimary && (
              <Button
                text={resolvedPrimary.text || resolvedPrimary.label}
                link={resolvedPrimary.link || resolvedPrimary.href}
                variant={resolvedPrimary.style || 'primary'}
              />
            )}
            {resolvedSecondary && (
              <Button
                text={resolvedSecondary.text || resolvedSecondary.label}
                link={resolvedSecondary.link || resolvedSecondary.href}
                variant={resolvedSecondary.style || 'outline'}
              />
            )}
          </div>
        )}

        {trustLine && (
          <p style={{
            marginTop: '1.5rem',
            fontSize: '0.85rem',
            opacity: 0.75,
            lineHeight: 1.5,
            textAlign: alignment,
          }}>
            {trustLine}
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;
