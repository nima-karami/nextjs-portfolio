import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ResumePage from '@/pages/resume';

// Mock the dependencies
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

jest.mock('markdown-to-jsx', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => <div>{children}</div>,
}));

jest.mock('@/components/shimmer-border-card', () => {
  return {
    __esModule: true,
    default: ({ children, scaleOnHover, className }: any) => (
      <div className={className || ''}>{children}</div>
    ),
  };
});

describe('Resume Page', () => {
  it('renders the resume page with main sections', () => {
    render(<ResumePage />);

    // Check main sections exist
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getAllByText('About Me')).toHaveLength(2);
  });

  it('renders experience items correctly', () => {
    render(<ResumePage />);

    // Check if specific experience items are rendered
    expect(screen.getByText('TimePlay')).toBeInTheDocument();
    expect(screen.getByText('Functionland')).toBeInTheDocument();
    expect(screen.getByText('Diamond Schmitt')).toBeInTheDocument();
  });

  it('renders technologies correctly', () => {
    render(<ResumePage />);

    // Check if some technologies are rendered
    expect(screen.getByText('Typescript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('renders skills section', () => {
    render(<ResumePage />);

    // Check if skills are rendered
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  });

  it('renders education information', () => {
    render(<ResumePage />);

    expect(
      screen.getByText('MArch | University of Waterloo')
    ).toBeInTheDocument();
  });
});
