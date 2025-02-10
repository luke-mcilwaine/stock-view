import React from 'react';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  );
};

export default App;