import React from 'react';
import ReactDOM from 'react-dom/client';
import BattleTowers from './components/BattleTowers';
import AppProvider from './components/AppContext';
import './assets/scss/main.scss';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <BattleTowers />
    </AppProvider>
  </React.StrictMode>
);
