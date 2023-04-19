import React from 'react';
import ReactDOM from 'react-dom/client';
import { CalendarView } from './components/Components';

export const CalendarContext = React.createContext()

export const theme = {
  colors: {
    primary: 'rgb(235, 71, 61)',
    secondary: 'rgb(235, 236, 253)',
    secondaryPrimary: 'rgb(179, 184, 250)',
    bg: 'rgb(246, 246, 246)',
    border: 'rgb(235, 235, 235)',
    gray: 'rgb(192, 192, 192)'
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalendarView />
  </React.StrictMode>
)