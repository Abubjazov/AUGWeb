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

export interface AddUserTagModalContentProps {
  dappletId: string
}

const AddUserTagModalContent: FC<AddUserTagModalContentProps> = ({
  dappletId,
}) => {
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
        dappletId={dappletId}
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
