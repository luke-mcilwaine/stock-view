export interface PriceData {
  volume: number[];
  close: number[];
  open: number[];
  high: number[];
  low: number[];
  timestamp: string[];
}

export interface TickerData {
  ticker: string;
  price_data: PriceData;
}

export interface Filters {
  volume: { min: string; max: string };
  close: { min: string; max: string };
  open: { min: string; max: string };
  high: { min: string; max: string };
  low: { min: string; max: string };
}

export interface FilterBarProps {
  filters: {
    volume: { min: string; max: string };
    close: { min: string; max: string };
    open: { min: string; max: string };
    high: { min: string; max: string };
    low: { min: string; max: string };
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      volume: { min: string; max: string };
      close: { min: string; max: string };
      open: { min: string; max: string };
      high: { min: string; max: string };
      low: { min: string; max: string };
    }>
  >;
}

export interface DataItem {
  timestamp: string;
  volume: number;
  close: number;
  open: number;
  high: number;
  low: number;
}

export interface DataTableProps {
    data: DataItem[];
}

export interface SortConfig {
    key: string;
    direction: string;
}

export interface DataChartProps {
  data: Array<{
    timestamp: string;
    close: number;
  }>;
}

export interface SearchBarProps {
    onSearch: (term: string) => void;
}