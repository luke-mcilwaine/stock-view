import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import useFetchData from '../hooks/useFetchData';
import DataTable from '../components/DataTable';
import DataChart from '../components/DataChart';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import SortBar from '../components/SortBar';

const HomePage: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('App Context Invalid');
  }
  const { searchTerm, setSearchTerm } = context;
  const { data, loading, error } = useFetchData('https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=C');

  const [filters, setFilters] = useState({
    volume: { min: '', max: '' },
    close: { min: '', max: '' },
    open: { min: '', max: '' },
    high: { min: '', max: '' },
    low: { min: '', max: '' },
  });
  
  const [sortConfig, setSortConfig] = useState({ 
    key: 'timestamp', 
    direction: 'ascending' 
  });

  const transformedData = useMemo(() => {
    if (!data?.price_data) return [];
    
    return data.price_data.timestamp.map((timestamp, index) => ({
      timestamp,
      volume: data.price_data.volume[index],
      close: data.price_data.close[index],
      open: data.price_data.open[index],
      high: data.price_data.high[index],
      low: data.price_data.low[index],
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return transformedData.filter(item => 
      item.timestamp.includes(searchTerm) &&
      (filters.volume.min === '' || item.volume >= Number(filters.volume.min)) &&
      (filters.volume.max === '' || item.volume <= Number(filters.volume.max)) &&
      (filters.close.min === '' || item.close >= Number(filters.close.min)) &&
      (filters.close.max === '' || item.close <= Number(filters.close.max)) &&
      (filters.open.min === '' || item.open >= Number(filters.open.min)) &&
      (filters.open.max === '' || item.open <= Number(filters.open.max)) &&
      (filters.high.min === '' || item.high >= Number(filters.high.min)) &&
      (filters.high.max === '' || item.high <= Number(filters.high.max)) &&
      (filters.low.min === '' || item.low >= Number(filters.low.min)) &&
      (filters.low.max === '' || item.low <= Number(filters.low.max))
    );
  }, [transformedData, searchTerm, filters]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const key = sortConfig.key as keyof typeof a;
      if (a[key] < b[key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: Failed to fetch stock data. Please try again later.</p>;

  return (
    <div className="container">
      <h1 className="title">Stock Data for ticker: {data?.ticker}</h1>
      <SearchBar onSearch={setSearchTerm} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <SortBar sortConfig={sortConfig} setSortConfig={setSortConfig} />
      <DataTable data={sortedData} />
      <DataChart data={sortedData} />
    </div>
  );
};

export default HomePage;