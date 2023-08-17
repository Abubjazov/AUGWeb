import { FC } from 'react'

import MyTags from 'components/TagsGroup'
import CreateInput from 'uikit/CreateInput'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import SvgIcon from 'uikit/SvgIcon'
import WorkingOn from 'uikit/WorkingOn'
import { combineClasses as cc } from 'utils/combineClasses'
import { useResize } from 'utils/hooks/useResize'
import { mockTags } from 'utils/mockData'

import styles from './DappletSettings.module.css'

interface DappletSettingsProps {
  opened: boolean
  windowInner?: boolean
  openClose: React.Dispatch<React.SetStateAction<boolean>>
}

const DappletSettings: FC<DappletSettingsProps> = ({
  windowInner,
  opened,
  openClose,
}) => {
  const windowInnerWidth = useResize()

  const arrowButtonClickHandler = () => {
    openClose(!opened)
  }

  return (
    <div className={cc([styles.root])}>
      {!windowInner && (
        <div
          className={cc([
            styles['arrow-button'],
            opened ? '' : styles['ds-closed'],
          ])}
          onClick={arrowButtonClickHandler}
        >
          <SvgIcon icon={'arrowLeft'} />
        </div>
      )}

      {windowInnerWidth > 880 && (
        <>
          <span
            className={cc([
              styles.title,
              opened ? '' : styles['title-ds-closed'],
            ])}
          >
            Dapplet Settings
          </span>

          <CreateInput
            userStyles={styles['margin-top-30']}
            title={'Create new list'}
            placeholder={'List Name'}
            menuOpened={opened}
          />
        </>
      )}

      <CreateInput
        userStyles={styles['margin-top-60']}
        title={'New tag'}
        placeholder={'Tag Name'}
        menuOpened={opened}
      />

      <MyTags
        userStyles={styles['margin-top-60']}
        menuOpened={opened}
        tags={mockTags}
        title={'My tags'}
        tagMode={SmartTagMode.MY_TAG}
        titleUppercase
      />

      <MyTags
        userStyles={styles['margin-top-60']}
        menuOpened={opened}
        tags={mockTags}
        title={'Community tags'}
        tagMode={SmartTagMode.COMMUNITY_TAG}
        titleUppercase
      />

      {windowInnerWidth > 880 && (
        <WorkingOn dsOpened={opened} userStyles={styles['margin-top-60']} />
      )}
    </div>
  )
}

export default DappletSettings
