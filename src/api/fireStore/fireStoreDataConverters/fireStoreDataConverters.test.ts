import {
  DocumentSnapshot,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import {
  mockDapplets,
  mockUserDapplets,
  mockUserLists,
  mockUserTags,
} from 'mockData/mockData'

import {
  dappletsDataConverter,
  getFirebaseIconUrl,
  tagsDataConverter,
  userDataConverter,
} from './fireStoreDataConverters'

vi.mock('firebase/storage')

describe('fireStoreDataConverters', () => {
  test('userDataConverter "complete data"', () => {
    const mockedDocumentSnapshot = {
      records: {
        userDapplets: [...mockUserDapplets],
        userTags: [...mockUserTags],
        userLists: [...mockUserLists],
      },
      data: function () {
        return this.records
      },
    }

    const convertedUserData = userDataConverter(
      mockedDocumentSnapshot as unknown as DocumentSnapshot<
        DocumentData,
        DocumentData
      >,
    )

    expect(convertedUserData).toEqual(mockedDocumentSnapshot.records)
  })

  test('userDataConverter "data is incomplete"', () => {
    const mockedDocumentSnapshot = {
      records: {},
      data: function () {
        return this.records
      },
    }

    const convertedUserData = userDataConverter(
      mockedDocumentSnapshot as unknown as DocumentSnapshot<
        DocumentData,
        DocumentData
      >,
    )

    expect(convertedUserData).toEqual({
      userDapplets: [],
      userLists: [],
      userTags: [],
    })
  })

  test('tagsDataConverter', () => {
    const mockedQuerySnapshot = {
      docs: mockUserTags.map(tag => {
        return {
          id: tag.tagId,
          records: { tagName: tag.tagName },
          data: function () {
            return this.records
          },
        }
      }),
    }

    const convertedTagsData = tagsDataConverter(
      mockedQuerySnapshot as unknown as QuerySnapshot<
        DocumentData,
        DocumentData
      >,
    )

    expect(convertedTagsData).toEqual(
      mockUserTags.map(tag => ({ tagId: tag.tagId, tagName: tag.tagName })),
    )
  })

  test('dappletsDataConverter "complete data"', async () => {
    const mockedGetDownloadURL = vi
      .mocked(getDownloadURL)
      .mockResolvedValue('images/notAvailable.svg')

    const outputDapletsData = mockDapplets.map(dapplet => {
      return {
        dappletId: dapplet.dappletId,
        appOwner: dapplet.appOwner,
        circulatingSupply: dapplet.circulatingSupply,
        communityTags: dapplet.communityTags,
        date: dapplet.date,
        fullDesc: dapplet.fullDesc,
        fullyDilutedMarketCap: dapplet.fullyDilutedMarketCap,
        logo: 'images/notAvailable.svg',
        marketCap: dapplet.marketCap,
        maxSupply: dapplet.maxSupply,
        name: dapplet.name,
        shortDesc: dapplet.shortDesc,
        shortName: dapplet.shortName,
        totalSupply: dapplet.totalSupply,
        volume: dapplet.volume,
        volumePerMarketCap: dapplet.volumePerMarketCap,
      }
    })

    const mockedQuerySnapshot = {
      docs: mockDapplets.map(dapplet => {
        return {
          id: dapplet.dappletId,
          records: {
            appOwner: dapplet.appOwner,
            circulatingSupply: dapplet.circulatingSupply,
            communityTags: dapplet.communityTags,
            date: dapplet.date,
            fullDesc: dapplet.fullDesc,
            fullyDilutedMarketCap: dapplet.fullyDilutedMarketCap,
            marketCap: dapplet.marketCap,
            maxSupply: dapplet.maxSupply,
            name: dapplet.name,
            shortDesc: dapplet.shortDesc,
            shortName: dapplet.shortName,
            totalSupply: dapplet.totalSupply,
            volume: dapplet.volume,
            volumePerMarketCap: dapplet.volumePerMarketCap,
          },
          data: function () {
            return this.records
          },
        }
      }),
    }

    const convertedDappletsData = await dappletsDataConverter(
      mockedQuerySnapshot as unknown as QuerySnapshot<
        DocumentData,
        DocumentData
      >,
    )

    expect(convertedDappletsData).toEqual({
      dapplets: outputDapletsData,
      lastVisible:
        mockedQuerySnapshot.docs[mockedQuerySnapshot.docs.length - 1],
    })

    expect(mockedGetDownloadURL).toHaveBeenCalledTimes(mockDapplets.length)

    vi.resetAllMocks()
  })

  test('dappletsDataConverter "data is incomplete"', async () => {
    const mockedGetDownloadURL = vi
      .mocked(getDownloadURL)
      .mockResolvedValue('images/notAvailable.svg')

    const outputDapletsData = mockDapplets.map(dapplet => {
      return {
        dappletId: dapplet.dappletId,
        appOwner: 'N/A',
        circulatingSupply: 'N/A',
        communityTags: [],
        date: 'N/A',
        fullDesc: 'N/A',
        fullyDilutedMarketCap: 'N/A',
        logo: 'images/notAvailable.svg',
        marketCap: 'N/A',
        maxSupply: 'N/A',
        name: 'N/A',
        shortDesc: 'N/A',
        shortName: 'N/A',
        totalSupply: 'N/A',
        volume: 'N/A',
        volumePerMarketCap: 'N/A',
      }
    })

    const mockedQuerySnapshot = {
      docs: mockDapplets.map(dapplet => {
        return {
          id: dapplet.dappletId,
          records: {},
          data: function () {
            return this.records
          },
        }
      }),
    }

    const convertedDappletsData = await dappletsDataConverter(
      mockedQuerySnapshot as unknown as QuerySnapshot<
        DocumentData,
        DocumentData
      >,
    )

    expect(convertedDappletsData).toEqual({
      dapplets: outputDapletsData,
      lastVisible:
        mockedQuerySnapshot.docs[mockedQuerySnapshot.docs.length - 1],
    })

    expect(mockedGetDownloadURL).toHaveBeenCalledTimes(mockDapplets.length)

    vi.resetAllMocks()
  })

  test('dappletsDataConverter "no data"', async () => {
    const mockedGetDownloadURL = vi.mocked(getDownloadURL)

    const mockedQuerySnapshot = {
      docs: [],
    }

    const convertedDappletsData = await dappletsDataConverter(
      mockedQuerySnapshot as unknown as QuerySnapshot<
        DocumentData,
        DocumentData
      >,
    )

    expect(convertedDappletsData).toEqual({
      dapplets: [],
      lastVisible: undefined,
    })

    expect(mockedGetDownloadURL).toHaveBeenCalledTimes(0)

    vi.resetAllMocks()
  })

  test('getFirebaseIconUrl', async () => {
    const mockedRef = vi.mocked(ref)
    const mockedGetDownloadURL = vi
      .mocked(getDownloadURL)
      .mockResolvedValueOnce('testUrl')
      .mockRejectedValueOnce('images/notAvailable.svg')

    await getFirebaseIconUrl('testUrl')

    expect(mockedRef).toHaveBeenCalledTimes(1)
    expect(mockedRef).toHaveBeenCalledWith(undefined, 'testUrl')

    expect(mockedGetDownloadURL).toHaveBeenCalledTimes(1)

    mockedRef.mockClear()
    mockedGetDownloadURL.mockClear()

    await getFirebaseIconUrl('testUrl')

    expect(mockedRef).toHaveBeenCalledTimes(1)
    expect(mockedRef).toHaveBeenCalledWith(undefined, 'testUrl')

    expect(mockedGetDownloadURL).toHaveBeenCalledTimes(1)

    vi.resetAllMocks()
  })
})
