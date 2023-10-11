import { FC } from 'react'

import { nanoid } from 'nanoid'
import { removeUserTag } from 'services/userData/userData'
import { useAppDispatch } from 'store/hooks'
import { ITag } from 'store/slices/dappletsSlice'
import SmartTag from 'uikit/SmartTag'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './TagsGroup.module.css'

export interface TagsGroupProps {
  userStyles?: string
  title: string
  titleUppercase?: boolean
  tagMode: SmartTagMode
  menuOpened: boolean
  tags: ITag[]
  tagOperationGoing?: string[]
}

const TagsGroup: FC<TagsGroupProps> = ({
  userStyles = '',
  title,
  titleUppercase,
  tagMode,
  menuOpened,
  tags,
  tagOperationGoing = [],
}) => {
  const dispatch = useAppDispatch()

  return (
    <div
      className={cc([
        styles.root,
        menuOpened ? '' : styles['menu-closed'],
        userStyles,
      ])}
    >
      <span
        className={cc([
          styles['title'],
          titleUppercase ? styles.uppercase : '',
        ])}
      >
        {title}
      </span>

      <div className={styles['list']}>
        {tags.map(item => {
          const smartTagClickHandler = () => {
            void dispatch(removeUserTag(item.tagId))
          }

          return (
            <SmartTag
              key={nanoid()}
              mode={tagMode}
              tagId={item.tagId}
              label={item.tagName}
              userStyles={styles['list-item']}
              onClick={smartTagClickHandler}
              loading={tagOperationGoing.includes(item.tagId)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TagsGroup
