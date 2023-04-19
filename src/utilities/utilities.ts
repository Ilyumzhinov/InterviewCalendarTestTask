// NOTE: Содержит маленькие вспомогательные функции и типы


// MARK: Типы
export interface Event {
    date: Date
}


// MARK: Функции
/** Супер простая обёртка for-loop, чтобы создать массив [0,1,2,...,n] */
export const Range = (n: number) => ({
    toArray: () => Array(n).fill(0).map((_, i) => i),
    map: <T>(f: (i: number) => T): T[] => Array(n).fill(0).map((_, i) => f(i))
})

/** Добавляет n дней к объекту Date */
export const addDays = (date: Date, days: number): Date => {
    var result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

/** Сравнивает 2 Date по дням и часам */
export const compareDates = (date1: Date, date2: Date): boolean =>
    date1.getDate() === date2.getDate() && date1.getHours() === date2.getHours()