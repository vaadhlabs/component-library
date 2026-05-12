import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Check, X } from 'lucide-react';
import Button from '../forms/Button';
import { useStrapi } from '../../context/StrapiContext';

/**
 * Map a Stripe price (as shaped by Strapi's /api/stripe/prices) into the
 * PricingCard prop shape. Stripe is the source of truth — Strapi proxies +
 * caches the call, the marketing site renders whatever Stripe says.
 *
 * Display rules:
 *   - contactSales=true        → "Contact us" (no period suffix)
 *   - unitAmount===0           → "$0" + /interval (e.g. Free tier)
 *   - else                     → "$<amount>" + /interval
 */
const mapStripePriceToCard = (price) => {
  const unitDollars = price.unitAmount != null ? price.unitAmount / 100 : null;
  const period = price.interval && price.interval !== 'one_time' ? `/ ${price.interval}` : '';
  let displayPrice;
  let displayPeriod;
  if (price.contactSales) {
    displayPrice = 'Contact us';
    displayPeriod = '';
  } else if (unitDollars === 0) {
    displayPrice = '$0';
    displayPeriod = period;
  } else if (unitDollars != null) {
    displayPrice = `$${unitDollars.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    displayPeriod = period;
  } else {
    displayPrice = '';
    displayPeriod = '';
  }

  return {
    id: price.id,
    name: price.name,
    description: price.description || '',
    price: displayPrice,
    period: displayPeriod,
    features: price.features || [],
    cta: {
      text: price.ctaText || 'Get started',
      link: price.ctaLink || '/contact',
      style: price.popular ? 'secondary' : 'primary',
    },
    highlighted: !!price.popular,
    badge: price.popular ? 'Most popular' : '',
    sortOrder: price.sortOrder || 0,
  };
};

/**
 * Pricing Table Section Component.
 *
 * Two modes:
 *   1. Static — pass `plans` from Strapi or any other source. Renders as-is.
 *   2. Stripe-live — when `plans` is empty AND apiUrl is in StrapiContext,
 *      fetches /api/stripe/prices and renders the live Stripe Products.
 *      Stripe is then the single source of truth — edit the Product /
 *      metadata in Stripe Dashboard and the marketing site reflects within
 *      the cache TTL (60s strapi cache + browser cache-control).
 *
 * On fetch failure, falls back to whatever static `plans` were passed
 * (empty list → empty grid, which is acceptable degradation for a pricing
 * page).
 */
const PricingTable = ({
  title,
  subtitle,
  plans: staticPlans = [],
  showToggle = true,
  monthlyLabel = 'Monthly',
  yearlyLabel = 'Yearly',
  backgroundColor = '#ffffff',
  className = '',
}) => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [livePlans, setLivePlans] = useState(null);

  // Pull apiUrl from StrapiContext if available. Outside a provider, useStrapi
  // throws — guard so storybook / standalone usage still works.
  let apiUrl;
  try { ({ apiUrl } = useStrapi() || {}); } catch (_) { apiUrl = null; }

  const shouldFetchLive = staticPlans.length === 0 && !!apiUrl;

  useEffect(() => {
    if (!shouldFetchLive) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/api/stripe/prices`);
        if (!res.ok) return;
        const body = await res.json();
        if (cancelled) return;
        if (body?.configured && Array.isArray(body.prices)) {
          const mapped = body.prices
            .map(mapStripePriceToCard)
            .sort((a, b) => a.sortOrder - b.sortOrder);
          setLivePlans(mapped);
        }
      } catch (_) {
        // Fail closed — leave livePlans null so the grid renders empty.
      }
    })();
    return () => { cancelled = true; };
  }, [shouldFetchLive, apiUrl]);

  // Resolution order: static plans (when provided) → live Stripe plans → empty.
  const plans = staticPlans.length > 0 ? staticPlans : (livePlans || []);

  // Auto-detect if toggle is useful: only show if plans use monthlyPrice/yearlyPrice
  const hasLegacyPricing = plans.some(p => p.monthlyPrice != null || p.yearlyPrice != null);
  const shouldShowToggle = showToggle && hasLegacyPricing;

  const containerStyle = {
    background: backgroundColor,
    padding: '4rem 2rem',
  };

  return (
    <section className={clsx('pricing-table-section', className)} style={containerStyle}>
      {(title || subtitle) && (
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {title && <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{title}</h2>}
          {subtitle && <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>{subtitle}</p>}
        </div>
      )}

      {shouldShowToggle && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          <span style={{ 
            fontWeight: billingPeriod === 'monthly' ? 600 : 400,
            color: billingPeriod === 'monthly' ? '#1f2937' : '#9ca3af',
          }}>
            {monthlyLabel}
          </span>
          
          <button
            onClick={() => setBillingPeriod(p => p === 'monthly' ? 'yearly' : 'monthly')}
            style={{
              width: '56px',
              height: '28px',
              borderRadius: '14px',
              background: 'var(--gc-primary, #4f46e5)',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: 0,
            }}
          >
            <span style={{
              position: 'absolute',
              top: '2px',
              left: billingPeriod === 'yearly' ? '30px' : '2px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s',
            }} />
          </button>
          
          <span style={{ 
            fontWeight: billingPeriod === 'yearly' ? 600 : 400,
            color: billingPeriod === 'yearly' ? '#1f2937' : '#9ca3af',
          }}>
            {yearlyLabel}
          </span>
        </div>
      )}

      <div 
        className="pricing-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(plans.length, 4)}, 1fr)`,
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'stretch',
        }}
      >
        {plans.map((plan, index) => (
          <PricingCard 
            key={plan.id || index} 
            {...plan} 
            billingPeriod={billingPeriod}
          />
        ))}
      </div>
    </section>
  );
};

/**
 * Pricing Card Component
 * Supports both legacy props (monthlyPrice, yearlyPrice, ctaButton, features as [{text,included}])
 * and Strapi props (price, period, cta, isPopular, features as string[])
 */
const PricingCard = ({
  name,
  description,
  monthlyPrice,
  yearlyPrice,
  price: strapiPrice,
  period: strapiPeriod,
  currency = '$',
  billingPeriod,
  features = [],
  ctaButton,
  cta,
  highlighted = false,
  isPopular,
  badge,
}) => {
  // Resolve highlighted from either prop
  const isHighlighted = highlighted || isPopular || false;

  // Resolve price: prefer Strapi's flat `price` string, fallback to legacy monthly/yearly
  let displayPrice;
  let displayPeriod;

  if (strapiPrice !== undefined) {
    // Strapi format: price is a string like "Free", "$49", "Custom"
    displayPrice = strapiPrice;
    displayPeriod = strapiPeriod || '';
  } else {
    // Legacy format: monthlyPrice / yearlyPrice are numbers
    const numPrice = billingPeriod === 'yearly' && yearlyPrice ? yearlyPrice : monthlyPrice;
    displayPrice = numPrice != null ? `${currency}${numPrice}` : '';
    displayPeriod = billingPeriod === 'yearly' ? '/year' : '/month';
  }

  // Resolve CTA button: Strapi sends `cta`, legacy sends `ctaButton`
  const resolvedCta = cta || ctaButton;

  // Resolve badge for popular plans
  const resolvedBadge = badge || (isPopular ? 'Most Popular' : null);

  // Normalize features: handle both string[] and [{text, included}]
  const normalizedFeatures = features.map((f) => {
    if (typeof f === 'string') {
      return { text: f, included: true };
    }
    return f;
  });

  const cardStyle = {
    background: isHighlighted ? 'linear-gradient(135deg, var(--gc-gradient-from, #6366f1) 0%, var(--gc-gradient-to, #4f46e5) 100%)' : '#fff',
    color: isHighlighted ? '#fff' : '#1f2937',
    borderRadius: '16px',
    padding: '2rem',
    border: isHighlighted ? undefined : '1px solid #e5e7eb',
    boxShadow: isHighlighted
      ? '0 20px 40px var(--gc-primary-shadow, rgba(79, 70, 229, 0.3))'
      : '0 1px 2px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(15, 23, 42, 0.04)',
    position: 'relative',
    transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div className="pricing-card" style={cardStyle}>
      {resolvedBadge && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: isHighlighted ? '#fff' : 'var(--gc-primary, #4f46e5)',
          color: isHighlighted ? 'var(--gc-primary, #4f46e5)' : '#fff',
          padding: '0.25rem 1rem',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}>
          {resolvedBadge}
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>{name}</h3>
        {description && (
          <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>{description}</p>
        )}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{ fontSize: '3rem', fontWeight: 700 }}>
          {displayPrice}
        </span>
        {displayPeriod && <span style={{ opacity: 0.8 }}>{displayPeriod}</span>}
      </div>

      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        marginBottom: '2rem',
        flex: 1,
      }}>
        {normalizedFeatures.map((feature, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 0',
              opacity: feature.included !== false ? 1 : 0.5,
            }}
          >
            {feature.included !== false ? (
              <Check size={18} color={isHighlighted ? '#fff' : '#22c55e'} />
            ) : (
              <X size={18} color={isHighlighted ? 'rgba(255,255,255,0.5)' : '#ef4444'} />
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      {resolvedCta && (
        <Button
          text={resolvedCta.text || resolvedCta.label}
          link={resolvedCta.link || resolvedCta.href || resolvedCta.url}
          variant={isHighlighted ? 'secondary' : (resolvedCta.style || resolvedCta.variant || 'primary')}
          size="large"
          style={{
            width: '100%',
            background: isHighlighted ? '#fff' : undefined,
            color: isHighlighted ? 'var(--gc-primary, #4f46e5)' : undefined,
          }}
        />
      )}
    </div>
  );
};

export default PricingTable;

