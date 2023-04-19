import React from 'react';
import ReactDOM from 'react-dom/client';
import { CalendarView } from './components/CalendarView';
import { Event } from './utilities/utilities';


export const CalendarContext = React.createContext<{
  events: Event[],
  startDate: Date,
  selectedEvent: Event | undefined,
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | undefined>>
} | undefined>(undefined)

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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CalendarView />
  </React.StrictMode>
);