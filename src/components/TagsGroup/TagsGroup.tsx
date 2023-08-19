import { FC } from 'react'

import { nanoid } from 'nanoid'
import { ITag } from 'store/slices/communityTagsSlice'
import SmartTag from 'uikit/SmartTag'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import { combineClasses as cc } from 'utils/combineClasses'

import styles from './TagsGroup.module.css'

interface TagsGroupProps {
  userStyles?: string
  title: string
  titleUppercase?: boolean
  tagMode: SmartTagMode
  menuOpened: boolean
  tags: ITag[]
}

const TagsGroup: FC<TagsGroupProps> = ({
  userStyles = '',
  title,
  titleUppercase,
  tagMode,
  menuOpened,
  tags,
}) => {
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
        {tags.map(item => (
          <SmartTag
            key={nanoid()}
            mode={tagMode}
            tagId={item.tagId}
            label={item.tagName}
            userStyles={styles['list-item']}
          />
        ))}
      </div>
    </div>
  )
}

export default TagsGroup
