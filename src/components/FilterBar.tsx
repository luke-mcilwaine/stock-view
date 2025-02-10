import React from 'react';
import { FilterBarProps } from '../types';

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value, dataset } = e.target;
    const category = dataset.category as keyof typeof filters;

    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: { ...prevFilters[category], [name]: value }
    }));
  };

  return (
    <div className="filter-bar" data-testid="filter-bar">
      {['volume', 'close', 'open', 'high', 'low'].map(category => (
        <div key={category} data-testid={`${category}-filter`}>
          <label>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
          <input
            type="number"
            name="min"
            value={filters[category as keyof typeof filters].min}
            onChange={handleChange}
            placeholder={`Min ${category}`}
            data-category={category}
            data-testid={`${category}-min-input`}
          />
          <input
            type="number"
            name="max"
            value={filters[category as keyof typeof filters].max}
            onChange={handleChange}
            placeholder={`Max ${category}`}
            data-category={category}
            data-testid={`${category}-max-input`}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
