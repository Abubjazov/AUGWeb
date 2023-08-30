import { FC } from 'react'

import TagsGroup from 'components/TagsGroup'
import { useResize } from 'hooks/useResize'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setDappletSettingsState } from 'store/layoutSlice/layoutSlice'
import { addMyTag } from 'store/slices/myDappletsSlice'
import CreateInput from 'uikit/CreateInput'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import SvgIcon from 'uikit/SvgIcon'
import WorkingOn from 'uikit/WorkingOn'
import { combineClasses as cc } from 'utils/combineClasses'

import styles from './DappletSettings.module.css'

export interface DappletSettingsProps {
  windowInner?: boolean
}

const DappletSettings: FC<DappletSettingsProps> = ({ windowInner }) => {
  const windowInnerWidth = useResize()

  const { dappletSettingsOpened } = useAppSelector(state => state.layout)
  const myTags = useAppSelector(state => state.myDapplets.myTags)
  const communityTags = useAppSelector(state => state.dapplets.tags)

  const dispatch = useAppDispatch()

  const arrowButtonClickHandler = () => {
    dispatch(setDappletSettingsState(!dappletSettingsOpened))
  }

  const addMyTagHandler = (tagName: string) => {
    const tagId = Date.now()

    dispatch(addMyTag({ tagId, tagName }))
  }

  return (
    <div className={cc([styles.root])}>
      {!windowInner && (
        <div
          className={cc([
            styles['arrow-button'],
            dappletSettingsOpened ? '' : styles['ds-closed'],
          ])}
          onClick={arrowButtonClickHandler}
          data-testid={'dapplet-settings-arrow-button'}
        >
          <SvgIcon icon={'arrowLeft'} />
        </div>
      )}

      {windowInnerWidth > 880 && (
        <>
          <span
            className={cc([
              styles.title,
              dappletSettingsOpened ? '' : styles['title-ds-closed'],
            ])}
          >
            Dapplet Settings
          </span>

          <CreateInput
            userStyles={styles['margin-top-30']}
            title={'Create new list'}
            placeholder={'List Name'}
            menuOpened={dappletSettingsOpened}
          />
        </>
      )}

      <CreateInput
        userStyles={styles['margin-top-60']}
        title={'New tag'}
        placeholder={'Tag Name'}
        menuOpened={dappletSettingsOpened}
        onClick={addMyTagHandler}
      />

      <TagsGroup
        userStyles={styles['margin-top-60']}
        menuOpened={dappletSettingsOpened}
        tags={myTags}
        title={'My tags'}
        tagMode={SmartTagMode.MY_TAG}
        titleUppercase
      />

      <TagsGroup
        userStyles={styles['margin-top-60']}
        menuOpened={dappletSettingsOpened}
        tags={communityTags}
        title={'Community tags'}
        tagMode={SmartTagMode.COMMUNITY_TAG}
        titleUppercase
      />

      {windowInnerWidth > 880 && (
        <WorkingOn
          dsOpened={dappletSettingsOpened}
          userStyles={styles['margin-top-60']}
        />
      )}
    </div>
  )
}

export default DappletSettings
