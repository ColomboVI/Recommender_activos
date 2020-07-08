import React from 'react';
import './App.css';
import './assets/css/global.css';
import DataContextProvider from './contexts/DataContext';
import MainApp from './MainApp';

const App = () => {
  return (
    <DataContextProvider>
      <MainApp />
    </DataContextProvider>
  );
};

export default App;
