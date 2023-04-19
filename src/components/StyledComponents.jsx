import styled, { createGlobalStyle, css } from "styled-components";


// MARK: Global
export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #root {
        display: flex;
        justify-content: center;
    }
`

export const Calendar = styled.div`
    width: 740px;
    height: 100vh;
    max-height: -webkit-fill-available;
    display: flex;
    flex-direction: column;
`

export const Flex = styled.div`
    display: flex;
`

export const Button = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    display: block;
    margin: auto;
    font-size: large;
`

export const GridCell = styled.div`
    width: calc(100% / ${({ columns }) => columns});
`


// MARK: Header
export const Header = styled.header`
    display: flex;
    padding: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    h1 {
        font-weight: 200;
        flex: 1;
    }
`


// MARK: Main
export const Main = styled.main`
    overflow-y: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
`

// Dates selector
export const DatesSelectorStyled = styled.div`
    background: ${({ theme }) => theme.colors.bg};
    padding-block: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const DateCell = styled(GridCell)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const DateLabel = styled.div`
    font-size: small;
`

export const DateNumber = styled.div`
    padding: 0.5rem;
    clip-path: circle();

    ${({ isActive, theme }) => isActive && css`
        background-color: ${theme.colors.primary};
        color: white;
    `}
`

export const MonthTitle = styled.div`
    width: calc(100% / 8 * 5);
    text-align: center;
`

// MARK: Events view
export const ScrollViewStyled = styled.div`
    height: 100%;
    overflow-y: auto;
`

export const EventsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    background-color: ${({ theme }) => theme.colors.border};
    margin-block: 0.7rem;
    border-top: 2px solid ${({ theme }) => theme.colors.border};
`

export const TimeCell = styled(GridCell)`
    margin-top: -0.7rem;
    box-sizing: border-box;
    padding-inline: 0.5rem;
    text-align: end;
    background-color: white;
    color: ${({ theme }) => theme.colors.gray};
    z-index: 1;
`

export const EventsRow = styled.div`
    display: flex;
    gap: 2px;
    flex: 1;
`

export const HourCell = styled(GridCell)`
    border: 2px solid white;
    background-color: white;
    height: 2rem;
    box-sizing: border-box;

    ${({ isEvent }) => isEvent && css`
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.secondary};
    `}

    ${({ isSelected, theme }) => isSelected && css`
        background-color: ${theme.colors.secondaryPrimary};
    `}
`


// MARK: Footer
export const Footer = styled.div`
    background-color: ${({ theme }) => theme.colors.bg}; 
    text-align: center;
    padding: 1em;
    display: flex;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`