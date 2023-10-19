import { FC } from 'react'

import TagsGroup from 'components/TagsGroup'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setModalState } from 'store/slices/layoutSlice'
import BaseButton from 'uikit/BaseButton'
import { BaseButtonMode } from 'uikit/BaseButton/BaseButton'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'

import styles from './AddUserTagModalContent.module.css'

export enum ERenderMode {
  WELCOME = 'welcome',
  LOGIN = 'login',
  REGISTRATION = 'registration',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AddUserTagModalContentProps {}

const AddUserTagModalContent: FC<AddUserTagModalContentProps> = () => {
  const dispatch = useAppDispatch()

  const { userTags, tagOperationGoing } = useAppSelector(
    state => state.userData,
  )

  return (
    <div className={styles['root']}>
      <TagsGroup
        menuOpened={true}
        tags={userTags}
        title={'My tags'}
        tagMode={SmartTagMode.MY_TAG_MODAL}
        titleUppercase
        tagOperationGoing={tagOperationGoing}
      />

      <div className={styles.buttons}>
        <BaseButton
          userStyles={styles.button}
          label={'Close'}
          mode={BaseButtonMode.CONTAINED_RED}
          onClick={() => dispatch(setModalState(false))}
        />
      </div>
    </div>
  )
}

export default AddUserTagModalContent
