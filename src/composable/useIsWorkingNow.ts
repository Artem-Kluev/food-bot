export function useIsWorkingNow(workingDays: number[], workingHours: number[]) {
  // Приводимо рядки до масивів, якщо вони у форматі JSON
  if (typeof workingDays === 'string') workingDays = JSON.parse(workingDays)
  if (typeof workingHours === 'string') workingHours = JSON.parse(workingHours)

  const now = new Date()
  const day = now.getDay() // 0 = неділя, 1 = понеділок, ..., 6 = субота
  const hour = now.getHours() // година від 0 до 23

  // Масиви в твоєму форматі [start, end]
  const [dayStart, dayEnd] = workingDays
  const [hourStart, hourEnd] = workingHours

  // Перевірка дня
  const dayMatches = dayStart <= day && day <= dayEnd

  // Перевірка години
  const hourMatches = hourStart <= hour && hour <= hourEnd

  return dayMatches && hourMatches
}
