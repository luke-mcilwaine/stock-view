import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../src/pages/HomePage';
import { AppContext } from '../src/context/AppContext';
import useFetchData from '../src/hooks/useFetchData';

jest.mock('../src/components/DataChart', () => {
  return {
    __esModule: true,
    default: ({ data }: { data: number[] }) => (
      <div data-testid="data-chart">Mock Chart</div>
    )
  };
});

jest.mock('../src/hooks/useFetchData');

const mockUseFetchData = jest.mocked(useFetchData);

describe('HomePage', () => {
  const mockData = {
    price_data: {
      timestamp: ['2024-01-01', '2024-01-02'],
      volume: [1000, 2000],
      close: [150.00, 155.00],
      open: [149.00, 154.00],
      high: [152.00, 157.00],
      low: [148.00, 153.00]
    },
    ticker: 'MOCK'
  };

  const mockContext = {
    searchTerm: '',
    setSearchTerm: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFetchData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null
    });
  });

  const renderHomePage = () => {
    return render(
      <AppContext.Provider value={mockContext}>
        <HomePage />
      </AppContext.Provider>
    );
  };

  it('renders all main components when data is loaded', () => {
    renderHomePage();
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getByTestId('data-chart')).toBeInTheDocument();
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('sort-bar')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    mockUseFetchData.mockReturnValue({
      data: null,
      loading: true,
      error: null
    });
    renderHomePage();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseFetchData.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to fetch stock data. Please try again later.')
    });
    renderHomePage();
    expect(screen.getByText(/Failed to fetch stock data. Please try again later./)).toBeInTheDocument();
  });

  it('displays stock data correctly', () => {
    renderHomePage();
    expect(screen.getByText('150.00')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });
});
