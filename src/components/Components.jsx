import React from "react"
import { CalendarContext, theme } from ".."
import { Range, addDays, compareDates } from "../utilities/utilities"
import { ThemeProvider } from "styled-components"
import { Button, Calendar, GridCell, DateCell, DateLabel, DateNumber, DatesSelectorStyled, EventsStyled, Flex, GlobalStyles, Header, Main, MonthTitle, ScrollViewStyled, TimeCell, EventsRow, HourCell, Footer } from "./StyledComponents"

const DatesView = ({ date }) => {
    const currentDate = new Date('03/29/2021')

    const weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    const dates = Range(7).map(i => addDays(date, i))

    return (
        <Flex>
            <GridCell columns={8} />
            {
                dates.map(date =>
                    <DateCell columns={8} key={date}>
                        <DateLabel>{weekday[date.getDay()]}</DateLabel>
                        <DateNumber isActive={date.getDate() === currentDate.getDate()}>
                            {date.getDate()}
                        </DateNumber>
                    </DateCell>
                )
            }
        </Flex>
    )
}

const DatesSelector = ({ startDate, month }) => {
    return (
        <DatesSelectorStyled>
            <DatesView date={startDate} />

            <Flex>
                <GridCell columns={8} />
                <GridCell columns={8}>
                    <Button>
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </Button>
                </GridCell>
                <MonthTitle>{month}</MonthTitle>
                <GridCell columns={8}>
                    <Button>
                        <span className="material-symbols-outlined">arrow_forward_ios</span>
                    </Button>
                </GridCell>
            </Flex>
        </DatesSelectorStyled>
    )
}

const HourView = ({ hour, events }) => {
    const { startDate, selectedEvent, setSelectedEvent } = React.useContext(CalendarContext)

    const checkDate = date =>
        events.some(event => compareDates(event.date, date))

    const dates = Range(7).map(i => {
        const date = addDays(startDate, i)
        date.setHours(hour)
        return date
    })
    const label = hour < 10 ? `0${hour}:00` : `${hour}:00`

    const handleClick = date => {
        const event = events.find(event => compareDates(event.date, date))

        if (event !== undefined)
            setSelectedEvent(event)
        else setSelectedEvent(undefined)
    }

    return (
        <Flex>
            <TimeCell columns={8}>{label}</TimeCell>
            <EventsRow>
                {dates.map(date =>
                    <HourCell
                        key={date}
                        columns={7}
                        isEvent={checkDate(date)}
                        isSelected={selectedEvent !== undefined && compareDates(date, selectedEvent.date)}
                        onClick={() => handleClick(date)}
                    />
                )}
            </EventsRow>
        </Flex>
    )
}

const DayView = ({ events }) => {
    const hours = Range(24).toArray()
    return (
        <EventsStyled>
            {hours.map(hour =>
                <HourView
                    hour={hour}
                    events={events.filter(event => event.date.getHours() === hour)}
                    key={hour}
                />
            )}
        </EventsStyled>
    )
}

export const CalendarView = () => {
    const startDate = new Date('03/25/2019')
    const month = 'March 2019'

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
    const [selectedEvent, setSelectedEvent] = React.useState(undefined)

    const handleAdd = () => {
        const input = prompt("Enter event time:\nYYYY-MM-DD HH:mm:ss"),
            date = new Date(input)

        if (!isNaN(date))
            setEvents(events => [...events, { date: date }])
    }
    const handleDelete = () => {
        if (selectedEvent !== undefined) {
            setEvents(events =>
                events.filter(event =>
                    false === compareDates(event.date, selectedEvent.date))
            )
            setSelectedEvent(undefined)
        }
    }

    return (
        <CalendarContext.Provider value={{ events, selectedEvent, setSelectedEvent, startDate }}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Calendar>
                    <Header>
                        <h1>Interview Calendar</h1>
                        <Button onClick={handleAdd}>
                            <span className="material-symbols-outlined">add</span>
                        </Button>
                    </Header >
                    <Main>
                        <DatesSelector startDate={startDate} month={month} />
                        <ScrollViewStyled>
                            <DayView events={events} />
                        </ScrollViewStyled>
                    </Main>
                    <Footer>
                        <Button>Today</Button>
                        <div style={{ flex: 1 }} />
                        {selectedEvent !== undefined && <Button onClick={handleDelete}>Delete</Button>}
                    </Footer>
                </Calendar>
            </ThemeProvider>
        </CalendarContext.Provider>
    )
}