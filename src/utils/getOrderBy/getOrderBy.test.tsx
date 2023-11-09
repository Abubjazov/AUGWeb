import { mockDapplets } from 'mockData/mockData'
import { EOrderBy, IDapplet } from 'store/slices/dappletsSlice'

import { getOrderBy } from './getOrderBy'

describe('getOrderBy()', () => {
  test('should return "ASC by name" from "IDapplet[]"', () => {
    const mockDappletsClone1 = structuredClone(mockDapplets)
    const mockDappletsClone2 = structuredClone(mockDapplets)

    expect(mockDappletsClone1.sort(getOrderBy(EOrderBy.ASC_BY_NAME))).toEqual(
      mockDappletsClone2.sort((a: IDapplet, b: IDapplet) =>
        a.name.toLowerCase() < b.name.toLowerCase()
          ? -1
          : a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : 0,
      ),
    )
  })

  test('should return "DESC by name" from "IDapplet[]"', () => {
    const mockDappletsClone1 = structuredClone(mockDapplets)
    const mockDappletsClone2 = structuredClone(mockDapplets)

    expect(mockDappletsClone1.sort(getOrderBy(EOrderBy.DESC_BY_NAME))).toEqual(
      mockDappletsClone2.sort((a: IDapplet, b: IDapplet) =>
        a.name.toLowerCase() > b.name.toLowerCase()
          ? -1
          : a.name.toLowerCase() < b.name.toLowerCase()
          ? 1
          : 0,
      ),
    )
  })

  test('should return "ASC by market cap" from "IDapplet[]"', () => {
    const mockDappletsClone1 = structuredClone(mockDapplets)
    const mockDappletsClone2 = structuredClone(mockDapplets)

    expect(
      mockDappletsClone1.sort(getOrderBy(EOrderBy.ASC_BY_MARKET_CAP)),
    ).toEqual(
      mockDappletsClone2.sort((a: IDapplet, b: IDapplet) =>
        Number(a.marketCap) < Number(b.marketCap)
          ? -1
          : Number(a.marketCap) > Number(b.marketCap)
          ? 1
          : 0,
      ),
    )
  })

  test('should return "DESC by market cap" from "IDapplet[]"', () => {
    const mockDappletsClone1 = structuredClone(mockDapplets)
    const mockDappletsClone2 = structuredClone(mockDapplets)

    expect(
      mockDappletsClone1.sort(getOrderBy(EOrderBy.DESC_BY_MARKET_CAP)),
    ).toEqual(
      mockDappletsClone2.sort((a: IDapplet, b: IDapplet) =>
        Number(a.marketCap) > Number(b.marketCap)
          ? -1
          : Number(a.marketCap) < Number(b.marketCap)
          ? 1
          : 0,
      ),
    )
  })
})
