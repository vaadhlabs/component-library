import { useState, useEffect } from 'react';
import { useStrapi } from '../context/StrapiContext';

/**
 * Page type enum values that map to URL paths.
 *
 * `products` maps to `/product` (singular). The Strapi pageType enum is
 * plural because Strapi conventions use plural collection-style names,
 * but the canonical URL is singular — most sites have one Product page,
 * not many.
 */
const PAGE_TYPE_ROUTES = {
  home: '/',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  solutions: '/solutions',
  products: '/product',
  blog: '/blog',
  careers: '/careers',
  terms: '/terms',
  privacy: '/privacy',
};

// Reverse-lookup: URL slug → pageType enum value.
const ROUTE_TO_PAGE_TYPE = Object.fromEntries(
  Object.entries(PAGE_TYPE_ROUTES).map(([type, route]) => [
    route.replace(/^\//, '') || 'home',
    type,
  ])
);

/**
 * Resolve a URL path to a pageType enum value.
 *
 * "/" or "" → "home"
 * "/pricing" → "pricing"
 * "/product" → "products" (URL-singular, enum-plural)
 * "/anything-else" → treated as a customSlug
 */
export const resolvePageType = (path) => {
  const clean = (path || '/').replace(/^\/+|\/+$/g, '') || 'home';

  // Try the URL → pageType reverse map first (handles /product → products).
  if (ROUTE_TO_PAGE_TYPE[clean] !== undefined) {
    return { pageType: ROUTE_TO_PAGE_TYPE[clean], isCustom: false };
  }

  // Fallback: maybe the slug already IS the pageType (e.g. /blog).
  if (PAGE_TYPE_ROUTES[clean] !== undefined) {
    return { pageType: clean, isCustom: false };
  }

  // Otherwise treat as custom slug.
  return { pageType: 'custom', isCustom: true, customSlug: clean };
};

/**
 * Get the URL path for a pageType.
 */
export const getPagePath = (pageType, customSlug) => {
  if (pageType === 'custom' && customSlug) {
    return `/${customSlug}`;
  }
  return PAGE_TYPE_ROUTES[pageType] || `/${pageType}`;
};

/**
 * Hook to fetch a page by its type or custom slug.
 *
 * Usage:
 *   const { page, loading, error } = usePage('pricing');
 *   const { page, loading, error } = usePage('home');
 *   const { page, loading, error } = usePage('custom', 'my-landing-page');
 */
export const usePage = (pageType, customSlug) => {
  const { fetchPage, fetchCustomPage } = useStrapi();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pageType) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const loadPage = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;
        if (pageType === 'custom' && customSlug) {
          data = await fetchCustomPage(customSlug);
        } else {
          data = await fetchPage(pageType);
        }

        if (mounted) {
          setPage(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPage();

    return () => {
      mounted = false;
    };
  }, [pageType, customSlug, fetchPage, fetchCustomPage]);

  return { page, loading, error };
};

export default usePage;
