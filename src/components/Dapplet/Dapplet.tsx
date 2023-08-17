import { FC, useState } from 'react'

import DappletTags from 'components/DappletTags'
import { Tag } from 'components/TagsGroup/TagsGroup'
import DappletTextBlock from 'uikit/DappletTextBlock'
import InstallButton from 'uikit/InstallButton'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses'
import { useResize } from 'utils/hooks/useResize'

import styles from './Dapplet.module.css'

export interface IDapplet {
  dappletId: number
  logo: string
  name: string
  date: number
  shortDesc: string
  fullDesc: string
  appOwner: string
  communityTags: Tag[]
  semperNeque: string
  aliquam: string
  urna: string
  leoIpsum: string
  inEuismod: string
  namDiam: string
  elitSagittis: string
  justoAmet: string
}

interface DappletProps {
  userStyles?: string
  dapplet: IDapplet
}
const Dapplet: FC<DappletProps> = ({ userStyles = '', dapplet }) => {
  const [dappletState, setDappletState] = useState(false)

  const windowInnerWidth = useResize()

  const burgerClickHandler = () => {
    setDappletState(!dappletState)
  }

  return windowInnerWidth > 880 ? (
    <div className={cc([styles.root, userStyles])}>
      <div className={styles['main-part']}>
        <div className={styles['burger']} onClick={burgerClickHandler}>
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
          tags={{
            userTags: dapplet.communityTags,
            communityTags: dapplet.communityTags,
          }}
          dappletState={dappletState}
        />

        <InstallButton />
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
    <div className={cc([styles.root, userStyles])} onClick={burgerClickHandler}>
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

          <InstallButton mobile />
        </div>

        <span className={styles['dapplet-descriptor']}>
          {dapplet.shortDesc}
        </span>

        <DappletTags
          tags={{
            userTags: dapplet.communityTags,
            communityTags: dapplet.communityTags,
          }}
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
