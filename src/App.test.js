import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the public sign-in route', () => {
  window.history.pushState({}, '', '/sign-in');

  render(<App />);

  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});
