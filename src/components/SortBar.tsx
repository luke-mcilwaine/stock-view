import { SortConfig } from "../types";

const SortBar = ({ sortConfig, setSortConfig }: {
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
}) => {
  const handleSort = (key: string) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' 
      ? 'descending' 
      : 'ascending';
    setSortConfig({ key, direction });
  };

  const columns = [
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'volume', label: 'Volume' },
    { key: 'close', label: 'Close' },
    { key: 'open', label: 'Open' },
    { key: 'high', label: 'High' },
    { key: 'low', label: 'Low' }
  ];

  return (
    <div className="sort-bar" data-testid="sort-bar">
      {columns.map(({ key, label }) => (
        <button key={key} onClick={() => handleSort(key)}>
          Sort by {label} 
          {sortConfig.key === key && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
        </button>
      ))}
    </div>
  );
};

export default SortBar;
