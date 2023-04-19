import React from "react"
import { Event, Range, addDays, compareDates } from "../utilities/utilities"
import { EventsRow, EventsStyled, Flex, HourCell, TimeCell } from "./StyledComponents"
import { CalendarContext } from ".."


// MARK: Week Events View
/** Показывает события в виде списка событий по дням (сслева направо) и часам (сверху вниз) */
export const WeekEventsView: React.FC<{ events: Event[] }> = ({ events }) => {
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


// MARK: Hour View
/** Показывает события по дням для определённого часа */
export const HourView: React.FC<{ hour: number, events: Event[] }> = ({ hour, events }) => {
    const { startDate, selectedEvent, setSelectedEvent } = React.useContext(CalendarContext)!

    /** Проверяет дату/время на наличие существующего события */
    const checkDate = (date: Date): boolean =>
        events.some(event => compareDates(event.date, date))

    const dates = Range(7).map(i => {
        const date = addDays(startDate, i)
        date.setHours(hour)
        return date
    })
    const label = hour < 10 ? `0${hour}:00` : `${hour}:00`

    /** Помечает событие как выбранное или очищает выбранное событие */
    const handleClick = (date: Date) => {
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
                        key={`${date.getDate()}-${date.getHours()}`}
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