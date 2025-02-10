import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from '../src/components/DataTable';
import '@testing-library/jest-dom';

describe('DataTable', () => {
  const mockData = [
    {
      timestamp: '2024-01-01',
      volume: 1000,
      close: 150.00,
      open: 149.00,
      high: 152.00,
      low: 148.00
    },
    {
      timestamp: '2024-01-02',
      volume: 2000,
      close: 155.00,
      open: 154.00,
      high: 157.00,
      low: 153.00
    }
  ];

  it('renders table with data', () => {
    render(<DataTable data={mockData} />);
    
    expect(screen.getByText('Timestamp')).toBeInTheDocument();
    expect(screen.getByText('Volume')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
    
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('150.00')).toBeInTheDocument();
  });

  it('handles empty data', () => {
    render(<DataTable data={[]} />);
    const rows = screen.queryAllByTestId('table-row');
    expect(rows).toHaveLength(0);
  });

  it('shows pagination when needed', () => {
    const lotsOfData = Array(11).fill(mockData[0]);
    render(<DataTable data={lotsOfData} />);
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
  });
});
