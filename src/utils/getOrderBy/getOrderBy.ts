import { EOrderBy, IDapplet } from 'store/slices/dappletsSlice'

export const getOrderBy = (orderBy: EOrderBy) => {
  if (orderBy === EOrderBy.ASC_BY_NAME) {
    return (a: IDapplet, b: IDapplet) =>
      a.name.toLowerCase() < b.name.toLowerCase()
        ? -1
        : a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : 0
  }

  if (orderBy === EOrderBy.DESC_BY_NAME) {
    return (a: IDapplet, b: IDapplet) =>
      a.name.toLowerCase() > b.name.toLowerCase()
        ? -1
        : a.name.toLowerCase() < b.name.toLowerCase()
        ? 1
        : 0
  }

  if (orderBy === EOrderBy.ASC_BY_MARKET_CAP) {
    return (a: IDapplet, b: IDapplet) =>
      Number(a.marketCap) < Number(b.marketCap)
        ? -1
        : Number(a.marketCap) > Number(b.marketCap)
        ? 1
        : 0
  }

  if (orderBy === EOrderBy.DESC_BY_MARKET_CAP) {
    return (a: IDapplet, b: IDapplet) =>
      Number(a.marketCap) > Number(b.marketCap)
        ? -1
        : Number(a.marketCap) < Number(b.marketCap)
        ? 1
        : 0
  }
}
