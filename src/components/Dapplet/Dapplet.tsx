import { DragEvent, FC, useState } from 'react'

import DappletTags from 'components/DappletTags'
import { useResize } from 'hooks/useResize'
import { useAppDispatch } from 'store/hooks'
import { IDapplet } from 'store/slices/dappletsSlice'
// import { IMyDapplet } from 'store/slices/myDappletsSlice'
import { addMyTagToDapplet } from 'store/slices/myDappletsSlice'
import DappletTextBlock from 'uikit/DappletTextBlock'
import InstallButton from 'uikit/InstallButton'
// import { InstallButtonMode } from 'uikit/InstallButton/InstallButton'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses'

import styles from './Dapplet.module.css'

export interface DappletProps {
  userStyles?: string
  dapplet: IDapplet
}
const Dapplet: FC<DappletProps> = ({ userStyles = '', dapplet }) => {
  const dispatch = useAppDispatch()

  const [dappletState, setDappletState] = useState(false)

  const windowInnerWidth = useResize()

  const burgerClickHandler = () => {
    setDappletState(!dappletState)
  }

  const dragOverHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const onDropHandler = (
    event: DragEvent<HTMLDivElement>,
    dappletId: number,
  ) => {
    event.preventDefault()

    const dragData = {
      dappletId,
      userTag: {
        tagId: Number(event.dataTransfer.getData('tagId')),
        tagName: event.dataTransfer.getData('tagLabel'),
      },
    }

    const tagMode = event.dataTransfer.getData('tagMode')

    if (tagMode === SmartTagMode.MY_TAG) dispatch(addMyTagToDapplet(dragData))
  }

  return windowInnerWidth > 880 ? (
    <div
      className={cc([styles.root, userStyles])}
      onDrop={event => onDropHandler(event, dapplet.dappletId)}
      onDragOver={event => dragOverHandler(event)}
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
          <span className={styles['dapplet-name']}>{dapplet.name}</span>

          <span className={styles['dapplet-publication-date']}>
            {dapplet.date}
          </span>
        </div>

        <span className={styles['dapplet-descriptor']}>
          {dapplet.shortDesc}
        </span>

        <span className={styles['dapplet-owner']}>{dapplet.appOwner}</span>

        <DappletTags
          dappletId={dapplet.dappletId}
          dappletState={dappletState}
        />

        <InstallButton dappletId={dapplet.dappletId} />
      </div>

      {dappletState && (
        <div className={styles['additional-part']}>
          <DappletTextBlock
            userStyles={styles['main-descriptor']}
            title={'Aliquam sit'}
            text={dapplet.fullDesc}
          />

          <div className={styles['additional-fields']}>
            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Semper neque'}
              text={dapplet.semperNeque}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Aliquam.'}
              text={dapplet.aliquam}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Urna.'}
              text={dapplet.urna}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Leo ipsum.'}
              text={dapplet.leoIpsum}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'In euismod.'}
              text={dapplet.inEuismod}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Nam diam.'}
              text={dapplet.namDiam}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Elit sagittis et.'}
              text={dapplet.elitSagittis}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Justo amet.'}
              text={dapplet.justoAmet}
            />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      className={cc([styles.root, userStyles])}
      onClick={burgerClickHandler}
      onDrop={event => onDropHandler(event, dapplet.dappletId)}
      onDragOver={event => dragOverHandler(event)}
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

          <InstallButton mobile dappletId={dapplet.dappletId} />
        </div>

        <span className={styles['dapplet-descriptor']}>
          {dapplet.shortDesc}
        </span>

        <DappletTags
          dappletId={dapplet.dappletId}
          dappletState={dappletState}
        />
      </div>

      {dappletState && (
        <div className={styles['additional-part']}>
          <DappletTextBlock
            userStyles={styles['main-descriptor']}
            title={'Aliquam sit'}
            text={dapplet.fullDesc}
          />

          <div className={styles['additional-fields']}>
            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Semper neque'}
              text={dapplet.semperNeque}
            />

            <DappletTextBlock
              userStyles={styles['additional-descriptor']}
              title={'Leo ipsum.'}
              text={dapplet.leoIpsum}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dapplet
