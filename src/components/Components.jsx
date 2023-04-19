import React from "react"
import { CalendarContext } from ".."
import { Range, addDays, compareDates } from "../utilities/utilities"

const DatesView = ({ date }) => {
    const currentDate = new Date('03/29/2021')

    const weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    const dates = Range(7).map(i => addDays(date, i))

    return (
        <div className="dates">
            <div className="cell" />
            {
                dates.map(date =>
                    <div className="cell date" key={date}>
                        <div className="dateLabel">{weekday[date.getDay()]}</div>
                        <div className={date.getDate() === currentDate.getDate() ? "dateNumber dateActive" : "dateNumber"}>{date.getDate()}</div>
                    </div>
                )
            }
        </div>
    )
}

const DatesSelector = ({ startDate, month }) => {
    return (
        <div className="datesSelector">
            <DatesView date={startDate} />

            <div className="weekSelector">
                <div className="cell" />
                <button className="button cell">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </button>
                <div className="monthTitle">{month}</div>
                <button className="button cell">
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                </button>
            </div>
        </div>
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
        <div className="hourRow">
            <div className="label cell">{label}</div>
            <div className="eventsRow">
                {dates.map(date =>
                    <div
                        key={date}
                        className={selectedEvent !== undefined && compareDates(date, selectedEvent.date) ? "hourCell event active" : checkDate(date) ? "hourCell event" : "hourCell"}
                        onClick={() => handleClick(date)}
                    />
                )}
            </div>
        </div>
    )
}

const DayView = ({ events }) => {
    const hours = Range(24).toArray()
    return (
        <div className="events">
            {hours.map(hour =>
                <HourView hour={hour} key={hour} events={events.filter(event => event.date.getHours() === hour)} />
            )}
        </div>
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
            <div className="calendar">
                <header className="title">
                    <h1>Interview Calendar</h1>
                    <button onClick={handleAdd}>
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </header >
                <main className="main">
                    <DatesSelector startDate={startDate} month={month} />
                    <div className="scrollview">
                        <DayView events={events} />
                    </div>
                </main >
                <footer className="footer">
                    <button>Today</button>
                    <div style={{ flex: 1 }} />
                    {selectedEvent !== undefined && <button onClick={handleDelete}>Delete</button>}
                </footer>
            </div >
        </CalendarContext.Provider>
    )
}