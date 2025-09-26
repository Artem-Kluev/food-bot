// Функція для днів тижня
function formatWorkingDays(daysRange: string): string {
  const days = JSON.parse(daysRange) as [number, number]

  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

  const [start, end] = days

  // Якщо з 1 по 7 – без вихідних
  if (start === 1 && end === 7) {
    return 'Без вихідних'
  }

  return `${dayNames[start - 1]}–${dayNames[end - 1]}`
}

// Функція для часу
function formatWorkingHours(hoursRange: string): string {
  const hours = JSON.parse(hoursRange) as [number, number]
  const [start, end] = hours

  // Якщо з 0 по 23 – цілодобово
  if (start === 0 && end === 23) {
    return 'Цілодобово'
  }

  // Допоміжна функція форматування у вигляді 09:00
  const formatHour = (h: number) => `${h.toString().padStart(2, '0')}:00`

  return `${formatHour(start)}–${formatHour(end)}`
}

export { formatWorkingDays, formatWorkingHours }
