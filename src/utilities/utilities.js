export const Range = (n) => ({
    toArray: () => Array(n).fill().map((_, i) => i),
    map: f => Array(n).fill().map((_, i) => f(i))
})

export const addDays = (date, days) => {
    var result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

export const compareDates = (date1, date2) =>
    date1.getDate() === date2.getDate() && date1.getHours() === date2.getHours()