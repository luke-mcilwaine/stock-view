import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from '../src/components/FilterBar';
import '@testing-library/jest-dom';

describe('FilterBar', () => {
  const mockFilters = {
    volume: { min: '', max: '' },
    close: { min: '', max: '' },
    open: { min: '', max: '' },
    high: { min: '', max: '' },
    low: { min: '', max: '' }
  };

  const mockSetFilters = jest.fn();

  beforeEach(() => {
    mockSetFilters.mockClear();
  });

  it('renders all filter inputs', () => {
    render(<FilterBar filters={mockFilters} setFilters={mockSetFilters} />);

    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
    expect(screen.getByTestId('volume-filter')).toBeInTheDocument();
    expect(screen.getByTestId('close-filter')).toBeInTheDocument();
    expect(screen.getByTestId('open-filter')).toBeInTheDocument();
  });

  it('updates filter when input changes', async () => {
    const user = userEvent.setup();
    render(<FilterBar filters={mockFilters} setFilters={mockSetFilters} />);

    const volumeMinInput = screen.getByTestId('volume-min-input');
    await user.type(volumeMinInput, '1000');

    expect(mockSetFilters).toHaveBeenCalled();
  });
});