import React from "react"
import { CalendarContext, theme } from ".."
import { Event } from "../utilities/utilities"
import { ThemeProvider } from "styled-components"
import { Calendar, GlobalStyles, Main } from "./StyledComponents"
import { WeekEventsView } from "./WeekEventsView"
import { Header } from "./Header"
import { Footer } from "./Footer"

/** Страница календаря, показывающая события недели */
export const CalendarView: React.FC = () => {
    const startDate = new Date('03/25/2019')

    const [events, setEvents] = React.useState([
        { date: new Date('03/25/2019 12:00') },
        { date: new Date('03/26/2019 12:00') },
        { date: new Date('03/27/2019 12:00') },
        { date: new Date('03/28/2019 12:00') },
        { date: new Date('03/29/2019 12:00') },
        { date: new Date('03/30/2019 12:00') },
        { date: new Date('03/31/2019 12:00') },
        { date: new Date('03/29/2019 8:00') },
        { date: new Date('03/28/2019 15:00') },
        { date: new Date('03/29/2019 17:00') },
        { date: new Date('03/26/2019 20:00') },
    ])
    const [selectedEvent, setSelectedEvent] = React.useState<Event | undefined>(undefined)

    return (
        <CalendarContext.Provider value={{ events, selectedEvent, setSelectedEvent, startDate }}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Calendar>
                    <Header
                        setEvents={setEvents}
                    />
                    <Main>
                        <WeekEventsView events={events} />
                    </Main>
                    <Footer setEvents={setEvents} />
                </Calendar>
            </ThemeProvider>
        </CalendarContext.Provider>
    )
}