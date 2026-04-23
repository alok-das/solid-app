import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from 'solid-testing-library';
import App from './App';

afterEach(() => {
  cleanup();
});

describe('App component', () => {
  it('renders the core app content and updates the counter', () => {
    render(() => <App />);

    const decrement = screen.getByText('-');
    const increment = screen.getByText('+');
    const output = screen.getByText('0');
    const link = screen.getByText('Learn new things in solid');

    expect(decrement).toBeTruthy();
    expect(increment).toBeTruthy();
    expect(output.textContent).toBe('0');
    expect(link).toBeTruthy();

    fireEvent.click(increment);
    expect(output.textContent).toBe('1');

    fireEvent.click(decrement);
    expect(output.textContent).toBe('0');
  });
});
