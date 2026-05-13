import React from 'react';
import clsx from 'clsx';

/**
 * Comparison — two-column "them vs us" table that re-renders as labeled
 * card-rows on narrow viewports.
 *
 * Mobile pattern: each comparison pair becomes a single card with the
 * column labels surfaced as small badges above each side. Side-by-side
 * is lost (the screen isn't wide enough), but the "which column is
 * which" signal is preserved by labeling each side in-place rather than
 * by relying on column position. Visual contrast (muted grey left,
 * brand-blue accent right) carries over.
 *
 * Wide viewports (≥ 640px) keep the original 2-col grid with shared
 * column headers, which is the punchier shape for desktop scanning.
 */
const Comparison = ({ title, subtitle, leftLabel, rightLabel, rows = [], className }) => {
  return (
    <section className={clsx('tc-comparison', className)}>
      <style>{COMPARISON_CSS}</style>
      <div className="tc-comparison-inner">
        {(title || subtitle) && (
          <div className="tc-comparison-header-block">
            {title && <h2 className="tc-comparison-title">{title}</h2>}
            {subtitle && <p className="tc-comparison-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="tc-comparison-table">
          <div className="tc-comparison-col-header tc-comparison-col-header-left">{leftLabel}</div>
          <div className="tc-comparison-col-header tc-comparison-col-header-right">{rightLabel}</div>
          {rows.map((row, i) => (
            <React.Fragment key={i}>
              <div
                className="tc-comparison-cell tc-comparison-cell-left"
                data-col-label={leftLabel}
              >
                {row.left}
              </div>
              <div
                className="tc-comparison-cell tc-comparison-cell-right"
                data-col-label={rightLabel}
              >
                {row.right}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const COMPARISON_CSS = `
  .tc-comparison {
    background: #ffffff;
    padding: 4rem 2rem;
  }
  .tc-comparison-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  .tc-comparison-header-block {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .tc-comparison-title {
    font-size: 1.875rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: #0f172a;
    margin: 0 0 0.5rem;
  }
  .tc-comparison-subtitle {
    font-size: 1rem;
    color: #64748b;
    margin: 0;
  }
  .tc-comparison-table {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  }
  .tc-comparison-col-header {
    padding: 1rem 1.5rem;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom: 1px solid #e5e7eb;
  }
  .tc-comparison-col-header-left {
    background: #f8fafc;
    color: #64748b;
    font-weight: 600;
    border-right: 1px solid #e5e7eb;
  }
  .tc-comparison-col-header-right {
    background: #f1f5f9;
    color: var(--gc-primary, #4f46e5);
    font-weight: 700;
    border-left: 3px solid var(--gc-primary, #4f46e5);
  }
  .tc-comparison-cell {
    padding: 1.25rem 1.5rem;
    font-size: 0.95rem;
    line-height: 1.5;
    border-bottom: 1px solid #e5e7eb;
  }
  .tc-comparison-cell-left {
    color: #64748b;
    border-right: 1px solid #e5e7eb;
  }
  .tc-comparison-cell-right {
    color: #0f172a;
    font-weight: 500;
  }
  /* Drop the bottom border on the last row. With 2-col grid the last two
     cells are the last rows; nth-last-of-type covers both. */
  .tc-comparison-cell:nth-last-of-type(-n+2) {
    border-bottom: none;
  }

  /* Narrow viewport: stack pairs as labeled cards, one card per
     comparison row. The shared column headers are hidden since each
     cell now carries its own label inline. */
  @media (max-width: 640px) {
    .tc-comparison {
      padding: 3rem 1rem;
    }
    .tc-comparison-table {
      grid-template-columns: 1fr;
      border: none;
      border-radius: 0;
      box-shadow: none;
      gap: 1rem;
      overflow: visible;
    }
    .tc-comparison-col-header {
      display: none;
    }
    .tc-comparison-cell {
      border: 1px solid #e5e7eb !important;
      border-radius: 10px;
      padding: 1rem 1.1rem;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    }
    .tc-comparison-cell::before {
      content: attr(data-col-label);
      display: block;
      font-size: 0.68rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      margin-bottom: 0.5rem;
    }
    .tc-comparison-cell-right {
      border-left: 3px solid var(--gc-primary, #4f46e5) !important;
      margin-bottom: 0.5rem;
    }
    .tc-comparison-cell-right::before {
      color: var(--gc-primary, #4f46e5);
    }
    /* Re-introduce row-pair grouping: the right card of one pair gets
       extra bottom margin so it visually separates from the next pair's
       left card. */
    .tc-comparison-cell-left + .tc-comparison-cell-right {
      margin-bottom: 1.25rem;
    }
  }
`;

export default Comparison;
