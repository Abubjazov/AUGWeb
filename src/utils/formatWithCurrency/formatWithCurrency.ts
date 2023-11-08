export const formatWithCurrency = (value: string, currency: string) =>
  value !== 'N/A' && !isNaN(Number(value))
    ? new Intl.NumberFormat('en-US').format(Number(value)) + ` ${currency}`
    : value
