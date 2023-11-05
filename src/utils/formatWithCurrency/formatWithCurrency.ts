export const formatWithCurrency = (value: string, currency: string) =>
  new Intl.NumberFormat('en-US').format(Number(value)) + ` ${currency}`
