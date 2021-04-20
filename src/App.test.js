import { render, screen } from '@testing-library/react';
import { RootStore } from './RootStore';

test('renders learn react link', () => {
  render(<RootStore />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
