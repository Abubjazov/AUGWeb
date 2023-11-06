export const formatWithCurrency = (value: string, currency: string) =>
  value !== 'N/A'
    ? new Intl.NumberFormat('en-US').format(Number(value)) + ` ${currency}`
    : value
