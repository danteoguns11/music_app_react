import { render, screen } from '@testing-library/react';
import SoundSafari from './components/SoundSafari';

test('renders learn react link', () => {
  render(<SoundSafari />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
