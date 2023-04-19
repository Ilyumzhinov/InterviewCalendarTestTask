import React from "react";
import { CalendarContext } from "..";
import { Range, addDays } from "../utilities/utilities"
import { Button, DateCell, DateLabel, DateNumber, DatesSelectorStyled, Flex, GridCell, HeaderStyled, MonthTitle, NavBar } from "./StyledComponents"


// MARK: Header
export const Header: React.FC<{
    setEvents: React.Dispatch<React.SetStateAction<{
        date: Date;
    }[]>>
}> = ({ setEvents }) => {
    const { startDate } = React.useContext(CalendarContext)!

    /** Добавляет событие при помощи window.prompt */
    const handleAdd = () => {
        const input = prompt("Enter event time:\nYYYY-MM-DD HH:mm:ss")

        if (input !== null)
            setEvents(events => [...events, { date: new Date(input) }])
    }

    return (
        <HeaderStyled>
            <NavBar>
                <h1>Interview Calendar</h1>
                <Button onClick={handleAdd}>
                    <span className="material-symbols-outlined">add</span>
                </Button>
            </NavBar>
            <DatesSelector startDate={startDate} />
        </HeaderStyled >
    )
}


// MARK: Dates Selector
/** Показывает список дней календаря и меню переключения недели */
export const DatesSelector: React.FC<{ startDate: Date }> = ({ startDate }) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
                <MonthTitle>{`${months[startDate.getMonth()]} ${startDate.getFullYear()}`}</MonthTitle>
                <GridCell columns={8}>
                    <Button>
                        <span className="material-symbols-outlined">arrow_forward_ios</span>
                    </Button>
                </GridCell>
            </Flex>
        </DatesSelectorStyled>
    )
}


// MARK: Dates view
/** Показывает дни недели и даты календаря для недели, начинающейся с числа */
const DatesView: React.FC<{ date: Date }> = ({ date }) => {
    const currentDate = new Date('03/29/2021')

    const weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    const dates = Range(7).map(i => addDays(date, i))

    return (
        <Flex>
            <GridCell columns={8} />
            {
                dates.map(date =>
                    <DateCell columns={8} key={date.getDate()}>
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