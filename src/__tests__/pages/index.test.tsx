import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Home from '@/pages/index';

describe('Home Page', () => {
  it('renders the page correctly', () => {
    render(<Home />);

    // Check if the title is rendered
    const heading = screen.getByRole('heading', { name: /nima karami/i });
    expect(heading).toBeInTheDocument();

    // Check if subtitle is rendered
    const subtitle = screen.getByRole('heading', {
      name: /lead full-stack developer \| product engineer/i,
    });
    expect(subtitle).toBeInTheDocument();

    // Check if navigation links are rendered with correct hrefs
    const resumeLink = screen.getByRole('link', { name: /resume/i });
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink).toHaveAttribute('href', '/resume');

    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');

    // Check that the navigation exists
    const navContainer = screen.getByRole('navigation');
    expect(navContainer).toBeInTheDocument();
  });
});
