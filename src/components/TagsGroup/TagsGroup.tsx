import { FC } from 'react'

import { nanoid } from 'nanoid'
import { removeUserTag } from 'store/asyncThunks/userData'
import { useAppDispatch } from 'store/hooks'
import { ITag } from 'store/slices/dappletsSlice'
import { ETagOperation, ITagOperation } from 'store/slices/userDataSlice'
import SmartTag from 'uikit/SmartTag'
import { ESmartTagMode } from 'uikit/SmartTag/SmartTag'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './TagsGroup.module.css'

export interface TagsGroupProps {
  userStyles?: string
  title: string
  titleUppercase?: boolean
  tagMode: ESmartTagMode
  menuOpened: boolean
  tags: ITag[]
  tagOperationGoing?: ITagOperation[]
  dappletId?: string
}

const TagsGroup: FC<TagsGroupProps> = ({
  userStyles = '',
  title,
  titleUppercase,
  tagMode,
  menuOpened,
  tags,
  tagOperationGoing = [],
  dappletId,
}) => {
  const dispatch = useAppDispatch()

  const getLoading = (tagId: string) => {
    return Boolean(
      tagOperationGoing.filter(
        operation =>
          operation.tagId === tagId &&
          (operation.operation === ETagOperation.REMOVE ||
            operation.operation === ETagOperation.ADD_TO_DAPPLET),
      ).length,
    )
  }

  return tags.length ? (
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
              loading={getLoading(item.tagId)}
              dappletId={dappletId}
            />
          )
        })}
      </div>
    </div>
  ) : null
}

export default TagsGroup
