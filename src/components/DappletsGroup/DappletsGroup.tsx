import { FC } from 'react'

import Dapplet from 'components/Dapplet/Dapplet'
import {
  EStatus,
  useDappletsGroupScroll,
} from 'hooks/useDappletsGroupScroll/useDappletsGroupScroll'
import { nanoid } from 'nanoid'
import { useAppSelector } from 'store/hooks'
import NotAvailable from 'uikit/NotAvailable'
import Spinner from 'uikit/Spinner/Spinner'
import { getTags } from 'utils/getTags/getTags'

import styles from './DappletsGroup.module.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DappletsGroupProps {}

const DappletsGroup: FC<DappletsGroupProps> = () => {
  const { tags } = useAppSelector(state => state.dapplets)
  const { userDapplets, userTags } = useAppSelector(state => state.userData)

  const { status, items } = useDappletsGroupScroll()

  return (
    <div className={styles.root}>
      {status === EStatus.LOADING && (
        <div className={styles.fallback}>
          <Spinner />
        </div>
      )}

      {(status === EStatus.WAITING || status === EStatus.ADDING_DAPPLETS) &&
        items &&
        items.map(item => (
          <Dapplet
            key={nanoid()}
            dapplet={item}
            dappletUserTags={getTags(item.dappletId, userTags, userDapplets)}
            dappletCommunityTags={getTags(item.dappletId, tags, items)}
          />
        ))}

      {status === EStatus.NO_DAPPLETS_AVAILABLE && (
        <NotAvailable text={'No dapplets available'} />
      )}

      {status === EStatus.ADDING_DAPPLETS && (
        <div className={styles.spinner}>
          <Spinner width={100} height={50} strokeWidth={3} />
        </div>
      )}
    </div>
  )
}

export default DappletsGroup
