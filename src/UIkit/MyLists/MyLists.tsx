import { FC, useState } from 'react'

import { removeUserList } from 'store/asyncThunks/userData'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { EListOperation } from 'store/slices/userDataSlice'
import Spinner from 'uikit/Spinner/Spinner'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './MyLists.module.css'

export interface MyListsProps {
  userStyles?: string
  menuOpened: boolean
}

const MyLists: FC<MyListsProps> = ({ menuOpened, userStyles = '' }) => {
  const { userLists, listOperationGoing } = useAppSelector(
    state => state.userData,
  )

  const dispatch = useAppDispatch()

  const [unInstallModeId, setUnInstallModeId] = useState('')

  const listItemOperationGoing = (listId: string) => {
    return Boolean(
      listOperationGoing.filter(
        operation =>
          operation.listId === listId &&
          operation.operation === EListOperation.REMOVE,
      ).length,
    )
  }

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    listId: string,
  ) => {
    e.stopPropagation()

    void dispatch(removeUserList(listId))
  }

  return userLists.length ? (
    <div
      className={cc([
        styles.root,
        menuOpened ? '' : styles['menu-closed'],
        userStyles,
      ])}
    >
      <span className={styles['title']}>My Lists</span>

      <div className={styles['list']}>
        {userLists &&
          userLists.map(list => (
            <div
              data-testid={'list-' + list.listId}
              key={list.listId}
              className={styles['list-item']}
              onMouseEnter={() => setUnInstallModeId(list.listId)}
              onMouseLeave={() => setUnInstallModeId('')}
            >
              <span>
                {list.listName} (<a href="#">Me</a>)
              </span>

              {!listItemOperationGoing(list.listId) &&
                unInstallModeId === list.listId && (
                  <button
                    data-list-id={list.listId}
                    aria-label={`Delete list ${list.listName}`}
                    type="button"
                    data-testid="delet-list-cross-button"
                    className={styles.button}
                    onClick={e => onClickHandler(e, list.listId)}
                  >
                    <SvgIcon icon={'redcross'} />
                  </button>
                )}

              {listItemOperationGoing(list.listId) && (
                <Spinner
                  width={20}
                  height={20}
                  strokeWidth={8}
                  strokeColor="#0085ff"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  ) : null
}

export default MyLists
