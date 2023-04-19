import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CalendarView } from './components/Components';

export const CalendarContext = React.createContext()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalendarView />
  </React.StrictMode>
)