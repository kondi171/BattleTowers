import React from 'react';
import ReactDOM from 'react-dom/client';
import BattleTowers from './components/BattleTowers';
import './assets/scss/main.scss';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BattleTowers />
  </React.StrictMode>
);
