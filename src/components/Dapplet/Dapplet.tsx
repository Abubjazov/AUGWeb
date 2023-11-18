import { DragEvent, FC, useState } from 'react'

import DappletTags from 'components/DappletTags'
import { useResize } from 'hooks/useResize/useResize'
import { addUserTagToDapplet } from 'store/asyncThunks/userData'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { IDapplet, ITag } from 'store/slices/dappletsSlice'
import { EDappletOperation } from 'store/slices/userDataSlice'
import DappletTextBlock from 'uikit/DappletTextBlock'
import InstallButton from 'uikit/InstallButton'
import { InstallButtonMode } from 'uikit/InstallButton/InstallButton'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'
import SvgIcon from 'uikit/SvgIcon'
import ValueDynamicsBar from 'uikit/ValueDynamicsBar'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'
import { formatWithCurrency } from 'utils/formatWithCurrency/formatWithCurrency'
import { getDate } from 'utils/getDate/getDate'

import styles from './Dapplet.module.css'

export interface DappletProps {
  userStyles?: string
  dapplet: IDapplet
  dappletUserTags: ITag[] | string
  dappletCommunityTags: ITag[] | string
  dragOver?: () => void
}

const Dapplet: FC<DappletProps> = ({
  userStyles = '',
  dapplet,
  dappletUserTags,
  dappletCommunityTags,
  dragOver,
}) => {
  const dispatch = useAppDispatch()

  const { dappletOperationGoing } = useAppSelector(state => state.userData)

  const [isDappletOpen, setIsDappletOpen] = useState(false)

  const windowInnerWidth = useResize()

  const burgerClickHandler = () => {
    setIsDappletOpen(!isDappletOpen)
  }

  const dragOverHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (dragOver) {
      dragOver()
    }
  }

  const onDropHandler = (event: DragEvent<HTMLDivElement>) => {
    const tagMode = event.dataTransfer.getData('mode')
    const userTagId = event.dataTransfer.getData('tagId')
    const dappletId = dapplet.dappletId

    if (tagMode === ESmartTagMode.MY_TAG) {
      void dispatch(addUserTagToDapplet({ dappletId, userTagId }))
    }
  }

  const getLoading = () => {
    return Boolean(
      dappletOperationGoing.filter(
        operation =>
          operation.dappletId === dapplet.dappletId &&
          (operation.operation === EDappletOperation.INSTALL ||
            operation.operation === EDappletOperation.UNINSTALL),
      ).length,
    )
  }

  const renderForMobile = () => (
    <div
      className={cc([styles.root, userStyles])}
      onClick={burgerClickHandler}
      onDrop={onDropHandler}
      onDragOver={dragOverHandler}
      data-testid={'dapplet'}
    >
      <div className={styles['main-part']}>
        <div className={styles['main-part-header']}>
          <div className={styles['main-part-logo-wrapper']}>
            <img
              className={styles.logo}
              src={dapplet.logo}
              alt="Company`s logo"
            />

            <div className={styles['dapplet-name-wrapper']}>
              <span className={styles['dapplet-name']}>{dapplet.name}</span>

              <span className={styles['dapplet-owner']}>
                {dapplet.appOwner}
              </span>
            </div>
          </div>

          <div className={styles['dapplet-installbuttons-wrapper']}>
            <InstallButton
              mobile
              dappletId={dapplet.dappletId}
              loading={getLoading()}
            />

            {isDappletOpen && (
              <InstallButton
                mobile
                setMode={InstallButtonMode.UNINSTALL}
                dappletId={dapplet.dappletId}
              />
            )}
          </div>
        </div>

        <span className={styles['dapplet-descriptor']}>
          {dapplet.shortDesc}
        </span>

        <DappletTags
          dappletId={dapplet.dappletId}
          dappletState={isDappletOpen}
          dappletOperationGoing={dappletOperationGoing}
          dappletUserTags={dappletUserTags}
          dappletCommunityTags={dappletCommunityTags}
        />
      </div>

      {isDappletOpen && (
        <div className={styles['additional-part']}>
          <DappletTextBlock
            userStyles={styles['main-descriptor']}
            title={'About'}
            text={dapplet.fullDesc}
          />

          <div className={styles['additional-fields']}>
            <ValueDynamicsBar
              title={'Market cap'}
              value={dapplet.marketCap}
              userStyles={styles['additional-descriptor']}
            />

            <ValueDynamicsBar
              title={'Volume (24h)'}
              value={dapplet.marketCap}
              userStyles={styles['additional-descriptor']}
            />
          </div>
        </div>
      )}
    </div>
  )

  const renderForDesktop = () => (
    <div
      className={cc([styles.root, userStyles])}
      onDrop={onDropHandler}
      onDragOver={dragOverHandler}
      data-testid={'dapplet'}
    >
      <div className={styles['main-part']}>
        <div
          className={styles['burger']}
          onClick={burgerClickHandler}
          data-testid="dapplet-burger-button"
        >
          <SvgIcon icon={'burger'} />
        </div>

        <img className={styles.logo} src={dapplet.logo} alt="Company`s logo" />

        <div className={styles['dapplet-name-wrapper']}>
          <span className={styles['dapplet-name']}>
            {dapplet.name} {dapplet.shortName}
          </span>

          <ValueDynamicsBar
            value={dapplet.marketCap}
            userStyles={styles['dapplet-market-cap']}
          />
        </div>

        <span className={styles['dapplet-descriptor']}>
          {dapplet.shortDesc}
        </span>

        <span className={styles['dapplet-owner']}>{dapplet.appOwner}</span>

        <DappletTags
          dappletId={dapplet.dappletId}
          dappletState={isDappletOpen}
          dappletOperationGoing={dappletOperationGoing}
          dappletUserTags={dappletUserTags}
          dappletCommunityTags={dappletCommunityTags}
        />

        <InstallButton dappletId={dapplet.dappletId} loading={getLoading()} />
      </div>

      {isDappletOpen && (
        <div className={styles['additional-part']}>
          <DappletTextBlock
            userStyles={styles['main-descriptor']}
            title={'About'}
            text={dapplet.fullDesc}
          />

          <div className={styles['additional-fields']}>
            <ValueDynamicsBar
              title={'Market cap'}
              value={dapplet.marketCap}
              userStyles={styles['additional-descriptor']}
            />

            <ValueDynamicsBar
              title={'Volume (24h)'}
              value={dapplet.volume}
              userStyles={styles['additional-descriptor']}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Volume/Market cap (24h)'}
              text={formatWithCurrency(dapplet.volumePerMarketCap, '%')}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Circulating supply'}
              text={formatWithCurrency(
                dapplet.circulatingSupply,
                dapplet.shortName,
              )}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Total supply'}
              text={formatWithCurrency(dapplet.totalSupply, dapplet.shortName)}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Max. supply'}
              text={formatWithCurrency(dapplet.maxSupply, dapplet.shortName)}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Fully diluted market cap'}
              text={formatWithCurrency(dapplet.fullyDilutedMarketCap, '$')}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Launched at'}
              text={getDate(dapplet.date)}
            />
          </div>
        </div>
      )}
    </div>
  )

  return windowInnerWidth <= 880 ? renderForMobile() : renderForDesktop()
}

export default Dapplet
