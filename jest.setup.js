require('@testing-library/jest-dom');

global.IntersectionObserver = class {
  constructor(cb) { this._cb = cb; }
  observe() {}
  unobserve() {}
  disconnect() {}
};

jest.mock('react-markdown', () => {
  const React = require('react');
  // The real component (combined with rehypeRaw) parses HTML in the input
  // string into DOM nodes. The mock matches that behaviour minimally for
  // string children — uses dangerouslySetInnerHTML so e.g. `<p>Content 2</p>`
  // becomes a real <p> node, not the literal text `<p>Content 2</p>`. Tests
  // that assert text via getByText('Content 2') depend on this.
  // Inline markdown links `[label](url)` become `<a>` so link behaviour can be
  // asserted without pulling in the full markdown pipeline in tests.
  function stubMarkdownLinksToHtml(source) {
    if (typeof source !== 'string') return '';
    return source.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  }
  function ReactMarkdown({ children }) {
    if (typeof children === 'string') {
      return React.createElement('div', {
        'data-testid': 'react-markdown-stub',
        dangerouslySetInnerHTML: { __html: stubMarkdownLinksToHtml(children) },
      });
    }
    return React.createElement(
      'div',
      { 'data-testid': 'react-markdown-stub' },
      children
    );
  }
  return ReactMarkdown;
});

jest.mock('rehype-raw', () => () => {});
