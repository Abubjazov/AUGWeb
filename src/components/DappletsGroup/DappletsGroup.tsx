import { FC } from 'react'

import Dapplet from 'components/Dapplet/Dapplet'
import {
  EStatus,
  useDappletsGroupScroll,
} from 'hooks/useDappletsGroupScroll/useDappletsGroupScroll'
import { nanoid } from 'nanoid'
import { useAppSelector } from 'store/hooks'
import NotAvailable from 'uikit/NotAvailable'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'
import Spinner from 'uikit/Spinner/Spinner'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'
import { getTags } from 'utils/getTags/getTags'

import styles from './DappletsGroup.module.css'

export interface DappletsGroupProps {
  userStyles?: string
}

const DappletsGroup: FC<DappletsGroupProps> = ({ userStyles }) => {
  const { dapplets, tags } = useAppSelector(state => state.dapplets)

  const { userDapplets, userTags } = useAppSelector(state => state.userData)

  const { status } = useDappletsGroupScroll()

  return (
    <div className={cc([styles.root, userStyles ? userStyles : ''])}>
      {status === EStatus.LOADING && (
        <div className={styles.fallback}>
          <Spinner />
        </div>
      )}

      {(status === EStatus.WAITING || status === EStatus.ADDING_DAPPLETS) &&
        dapplets?.length &&
        dapplets.map(item => (
          <Dapplet
            key={nanoid()}
            dapplet={item}
            dappletUserTags={getTags(
              item.dappletId,
              ESmartTagMode.MY_TAG,
              dapplets,
              userDapplets,
              tags,
              userTags,
            )}
            dappletCommunityTags={getTags(
              item.dappletId,
              ESmartTagMode.COMMUNITY_TAG,
              dapplets,
              userDapplets,
              tags,
              userTags,
            )}
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
