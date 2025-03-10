import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ContactPage from '@/pages/contact';

// Mock the theme context
jest.mock('@/contexts/theme-context', () => ({
  useTheme: () => ({ theme: 'dark' }),
}));

// Mock next/link to use a standard <a> tag
jest.mock('next/link', () => {
  const NextLink = ({ href, children, ...rest }: any) => {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
  NextLink.displayName = 'NextLink';
  return NextLink;
});

describe('Contact Page', () => {
  it('renders all contact options correctly', () => {
    render(<ContactPage />);

    // Check for the presence of all contact options
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const emailLink = screen.getByRole('link', { name: /email/i });

    // Verify all links exist
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();

    // Verify correct href attributes
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/nima-karami'
    );
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/nima-karami/'
    );
    expect(emailLink).toHaveAttribute('href', 'mailto:nkarami.dev@gmail.com');

    // Check that links open in new tab
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(emailLink).toHaveAttribute('target', '_blank');

    // Check that all titles are displayed
    expect(screen.getByText('Github')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders the correct number of contact cards', () => {
    render(<ContactPage />);

    // There should be 3 contact options
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
