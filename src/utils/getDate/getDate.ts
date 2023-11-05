export const getDate = (date: string) => {
  if (date !== 'N/A') return new Date(Number(date) * 1000).toLocaleDateString()

  return date
}
