import React from "react"
import { Button, FooterStyled } from "./StyledComponents"
import { CalendarContext } from ".."
import { compareDates } from "../utilities/utilities"

/** Показывает кнопки Today и Delete */
export const Footer: React.FC<{
    setEvents: React.Dispatch<React.SetStateAction<{
        date: Date;
    }[]>>
}> = ({ setEvents }) => {
    const { selectedEvent, setSelectedEvent } = React.useContext(CalendarContext)!

    /** Удаляет событие */
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
        <FooterStyled>
            <Button>Today</Button>
            <div style={{ flex: 1 }} />
            {selectedEvent !== undefined && <Button onClick={handleDelete}>Delete</Button>}
        </FooterStyled>
    )
}