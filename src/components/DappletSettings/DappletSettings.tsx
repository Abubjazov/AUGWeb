import { FC } from 'react'

import TagsGroup from 'components/TagsGroup'
import { useResize } from 'hooks/useResize/useResize'
import { nanoid } from 'nanoid'
import { addUserTag } from 'services/userData/userData'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setDappletSettingsState } from 'store/slices/layoutSlice'
import CreateInput from 'uikit/CreateInput'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import SvgIcon from 'uikit/SvgIcon'
import WorkingOn from 'uikit/WorkingOn'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './DappletSettings.module.css'

export interface DappletSettingsProps {
  windowInner?: boolean
}

const DappletSettings: FC<DappletSettingsProps> = ({ windowInner }) => {
  const windowInnerWidth = useResize()

  const { dappletSettingsOpened } = useAppSelector(state => state.layout)
  const { isAddingUserTag, tagOperationGoing } = useAppSelector(
    state => state.userData,
  )
  const myTags = useAppSelector(state => state.userData.userTags)
  const communityTags = useAppSelector(state => state.dapplets.tags)

  const dispatch = useAppDispatch()

  const arrowButtonClickHandler = () => {
    dispatch(setDappletSettingsState(!dappletSettingsOpened))
  }

  const addMyTagHandler = (tagName: string) => {
    const tagId = nanoid()

    void dispatch(addUserTag({ tagId, tagName }))
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
        loading={isAddingUserTag}
        inputValidators={{
          isEmpty: { value: true, message: 'Tag name required' },
          minLength: {
            value: 3,
            message: 'Minimum tag name length 3 symbols',
          },
        }}
      />

      <TagsGroup
        userStyles={styles['margin-top-60']}
        menuOpened={dappletSettingsOpened}
        tags={myTags}
        title={'My tags'}
        tagMode={SmartTagMode.MY_TAG}
        titleUppercase
        tagOperationGoing={tagOperationGoing}
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
