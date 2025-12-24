import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './MainPage';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
};

export default App;
