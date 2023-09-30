import { configureStore } from '@reduxjs/toolkit'
import { mockMyDapplets, mockMyTags } from 'mockData/mockData'

import {
  addMyTag,
  addMyTagToDapplet,
  installDapplet,
  removeMyTag,
  removeMyTagFromDapplet,
  unInstallDapplet,
} from '../userDataSlice'
import myDappletsReducer from '../userDataSlice'

describe('myDappletsSlice', () => {
  let store = configureStore({
    reducer: {
      myDapplets: myDappletsReducer,
    },
    preloadedState: {
      myDapplets: {
        myDapplets: [...mockMyDapplets],
        myTags: [...mockMyTags],
      },
    },
  })

  beforeEach(() => {
    store = configureStore({
      reducer: {
        myDapplets: myDappletsReducer,
      },
      preloadedState: {
        myDapplets: {
          myDapplets: [...mockMyDapplets],
          myTags: [...mockMyTags],
        },
      },
    })
  })

  describe('reducer: installDapplet tests', () => {
    test('installing a dapplet that is not listed in myDapplets (not tagged with a user tag)', () => {
      store.dispatch(installDapplet({ dappletId: 2 }))

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 2)[0]
          .dappletState,
      ).toEqual(true)
    })

    test('installing a dapplet that is in the myDapplets list (tagged with user tag)', () => {
      store.dispatch(installDapplet({ dappletId: 4 }))

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 4)[0]
          .dappletState,
      ).toEqual(true)
    })
  })

  describe('reducer: unInstallDapplet tests', () => {
    test('uninstalling a dapplet that is not listed in myDapplets (not tagged with a user tag and not installed)', () => {
      store.dispatch(unInstallDapplet({ dappletId: 2 }))
      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 2)
          .length,
      ).toEqual(0)
    })

    test('uninstalling a dapplet that is in myDapplets (not tagged with a user tag and installed)', () => {
      store.dispatch(unInstallDapplet({ dappletId: 7 }))
      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 7)
          .length,
      ).toEqual(0)
    })

    test('uninstalling a dapplet that is in the myDapplets list (tagged with a user tag and not installed)', () => {
      store.dispatch(unInstallDapplet({ dappletId: 4 }))

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 4)[0]
          .dappletState,
      ).toEqual(false)
    })

    test('uninstalling a dapplet that is in the myDapplets list (tagged with a user tag and has not installed)', () => {
      store.dispatch(unInstallDapplet({ dappletId: 6 }))

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 6)[0]
          .dappletState,
      ).toEqual(false)
    })
  })

  describe('reducer: addMyTagToDapplet tests', () => {
    test('adding a user tag to a dapplet that has not previously been tagged with a user tag and not installed', () => {
      store.dispatch(
        addMyTagToDapplet({
          dappletId: 2,
          userTag: { tagId: 3, tagName: 'Top 10' },
        }),
      )

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 2)[0]
          .userTags[0].tagId,
      ).toEqual(3)
    })

    test('adding a user tag to a dapplet that was previously tagged with a user tag and not installed', () => {
      store.dispatch(
        addMyTagToDapplet({
          dappletId: 4,
          userTag: { tagId: 3, tagName: 'Top 10' },
        }),
      )

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 4)[0]
          .userTags.filter(tag => tag.tagId === 3)[0].tagName,
      ).toEqual('Top 10')
    })

    test('adding a user tag to a dapplet that has not previously tagged with a user tag and installed', () => {
      store.dispatch(
        addMyTagToDapplet({
          dappletId: 7,
          userTag: { tagId: 3, tagName: 'Top 10' },
        }),
      )

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 7)[0]
          .userTags.filter(tag => tag.tagId === 3)[0].tagName,
      ).toEqual('Top 10')
    })

    test('adding a user tag to a dapplet that was previously tagged with a user tag and installed', () => {
      store.dispatch(
        addMyTagToDapplet({
          dappletId: 1,
          userTag: { tagId: 3, tagName: 'Top 10' },
        }),
      )

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 1)[0]
          .userTags.filter(tag => tag.tagId === 3)[0].tagName,
      ).toEqual('Top 10')
    })
  })

  describe('reducer: removeMyTagFromDapplet tests', () => {
    test('removing a user tag from a dapplet that has not previously been tagged with a user tag and not installed', () => {
      store.dispatch(
        removeMyTagFromDapplet({
          dappletId: 2,
          userTagId: 3,
        }),
      )

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 2)
          .length,
      ).toEqual(0)
    })

    test('removing a user tag to a dapplet that was previously tagged with a more one user tag and not installed', () => {
      const myTagsLength = store
        .getState()
        .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 4)[0]
        .userTags.length

      store.dispatch(
        removeMyTagFromDapplet({
          dappletId: 4,
          userTagId: 2,
        }),
      )

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 4)[0]
          .userTags.length,
      ).toEqual(myTagsLength - 1)
    })

    test('removing a user tag to a dapplet that was previously tagged with a one user tag and not installed', () => {
      store.dispatch(
        removeMyTagFromDapplet({
          dappletId: 9,
          userTagId: 1,
        }),
      )

      expect(
        store
          .getState()
          .myDapplets.myDapplets.filter(dapplet => dapplet.dappletId === 9)
          .length,
      ).toEqual(0)
    })
  })

  describe('reducer: addMyTag tests', () => {
    test('adding a user tag to a myTags list', () => {
      store.dispatch(
        addMyTag({
          tagId: 6,
          tagName: 'Added tag',
        }),
      )

      expect(
        store.getState().myDapplets.myTags.filter(tag => tag.tagId === 6)[0]
          .tagName,
      ).toEqual('Added tag')
    })
  })

  describe('reducer: removeMyTag tests', () => {
    test('removing a user tag from the myTags list that does not have any dapplet tagged with it', () => {
      const myTagsLength = store.getState().myDapplets.myTags.length
      const myDappletsLength = store.getState().myDapplets.myDapplets.length

      store.dispatch(
        removeMyTag({
          tagId: 3,
        }),
      )

      expect(store.getState().myDapplets.myTags.length).toEqual(
        myTagsLength - 1,
      )

      expect(store.getState().myDapplets.myDapplets.length).toEqual(
        myDappletsLength,
      )
    })

    test('removing the user tag from the myTags list with which dapplets are tagged', () => {
      const myTagsLength = store.getState().myDapplets.myTags.length
      const myDappletsLength = store.getState().myDapplets.myDapplets.length

      store.dispatch(
        removeMyTag({
          tagId: 1,
        }),
      )

      expect(store.getState().myDapplets.myTags.length).toEqual(
        myTagsLength - 1,
      )

      expect(store.getState().myDapplets.myDapplets.length).toEqual(
        myDappletsLength - 1,
      )
    })
  })
})
