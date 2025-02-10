import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortBar from '../src/components/SortBar';
import '@testing-library/jest-dom';

describe('SortBar', () => {
  const mockSetSortConfig = jest.fn();
  const defaultSortConfig = { key: 'timestamp', direction: 'ascending' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all sort buttons', () => {
    render(<SortBar sortConfig={defaultSortConfig} setSortConfig={mockSetSortConfig} />);
    
    expect(screen.getByText(/Sort by Timestamp/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by Volume/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by Close/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by Open/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by High/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by Low/i)).toBeInTheDocument();
  });

  it('toggles sort direction when clicking same column', () => {
    render(<SortBar 
      sortConfig={{ key: 'timestamp', direction: 'ascending' }} 
      setSortConfig={mockSetSortConfig} 
    />);

    const timestampButton = screen.getByText(/Sort by Timestamp/);
    fireEvent.click(timestampButton);

    expect(mockSetSortConfig).toHaveBeenCalledWith({
      key: 'timestamp',
      direction: 'descending'
    });
  });

  it('sets ascending direction when clicking new column', () => {
    render(<SortBar 
      sortConfig={{ key: 'timestamp', direction: 'ascending' }} 
      setSortConfig={mockSetSortConfig} 
    />);

    const volumeButton = screen.getByText(/Sort by Volume/);
    fireEvent.click(volumeButton);

    expect(mockSetSortConfig).toHaveBeenCalledWith({
      key: 'volume',
      direction: 'ascending'
    });
  });
});
