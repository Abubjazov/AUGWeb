import {
  mockCommunityTags,
  mockDapplets,
  mockUserDapplets,
  mockUserTags,
} from 'mockData/mockData'

import { getTags } from './getTags'

describe('getTags()', () => {
  test('should return "Community tags array for a specific dapplet" from "Dapplets"', () => {
    expect(
      getTags('ECNk2nNngwGXouvMpjWt', mockCommunityTags, mockDapplets),
    ).toEqual([
      {
        tagId: '3LYUFQTbdNULwBgCkfXx',
        tagName: 'Finances',
      },
      {
        tagId: 'C69B5fQ7ccW6Q1SC0yow',
        tagName: 'Favourites',
      },
    ])
  })

  test('should return "User tags array for a specific dapplet" from "User dapplets"', () => {
    expect(
      getTags('ECNk2nNngwGXouvMpjWt', mockUserTags, mockUserDapplets),
    ).toEqual([
      {
        tagId: 'JW3UFtZ5HgATcwldsJ1T',
        tagName: 'Facebook',
      },
      {
        tagId: '521keF1Adymn8Oo896vv',
        tagName: 'ToDo',
      },
    ])
  })

  test('should return "Empty tags array for a specific dapplet" from "Dapplets"', () => {
    expect(
      getTags('ErcSJarm6Ck1rzq7yhHG', mockCommunityTags, mockDapplets),
    ).toEqual([])
  })

  test('should return "Empty tags array for a specific dapplet" from "User dapplets"', () => {
    expect(
      getTags('ErcSJarm6Ck1rzq7yhHG', mockUserTags, mockUserDapplets),
    ).toEqual([])
  })

  test('should return "Empty tags array for a unknown dapplet" from "Dapplets"', () => {
    expect(getTags('unknown', mockCommunityTags, mockDapplets)).toEqual([])
  })

  test('should return "Empty tags array for a unknown dapplet" from "User dapplets"', () => {
    expect(getTags('unknown', mockUserTags, mockUserDapplets)).toEqual([])
  })

  test('should return "Empty tags array for a "N/A" dapplet.communityTags" from "Dapplets"', () => {
    expect(
      getTags('T6hUx4HWCKtnIEfwQxYp', mockCommunityTags, mockDapplets),
    ).toEqual([])
  })

  test('should return "Empty tags array for a "N/A" userDapplet.userTags" from "User dapplets"', () => {
    expect(
      getTags('T6hUx4HWCKtnIEfwQxYp', mockUserTags, mockUserDapplets),
    ).toEqual([])
  })
})
