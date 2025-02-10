import React from 'react';
import useDebounce from '../hooks/useDebounce';
import { SearchBarProps } from '../types';

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = React.useState('');
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  React.useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="search-bar" data-testid="search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search by timestamp e.g. 2025-01-01"
        data-testid="search-input"
      />
      <button onClick={() => onSearch(debouncedSearchTerm)}>Search</button>
    </div>
  );
};

export default SearchBar;
