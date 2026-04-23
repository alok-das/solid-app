import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('index entrypoint', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    vi.resetModules();
  });

  it('renders the app into the root container', async () => {
    await import('./index.jsx');

    const root = document.getElementById('root');
    const appLink = document.querySelector('a[href="https://github.com/solidjs/solid"]');

    expect(root).not.toBeNull();
    expect(appLink).not.toBeNull();
  });
});
