import { FC } from 'react'

import { Tag } from 'components/TagsGroup/TagsGroup'
import { nanoid } from 'nanoid'
import SmartTag from 'uikit/SmartTag'
import { SmartTagMode } from 'uikit/SmartTag/SmartTag'
import { combineClasses as cc } from 'utils/combineClasses'
import { useResize } from 'utils/hooks/useResize'

import styles from './DappletTags.module.css'

export interface DappletTags {
  userTags: Tag[]
  communityTags: Tag[]
}

interface DappletTagsProps {
  userStyles?: string
  tags: DappletTags
  dappletState: boolean
}

const DappletTags: FC<DappletTagsProps> = ({
  userStyles = '',
  tags,
  dappletState,
}) => {
  const windowInnerWidth = useResize()

  return (
    <div className={cc([styles.root, userStyles])}>
      {tags.userTags.map(item => (
        <SmartTag
          key={nanoid()}
          mode={SmartTagMode.MY_TAG}
          tagId={item.tagId}
          label={item.tagName}
        />
      ))}

      {tags.communityTags.map(item => (
        <SmartTag
          key={nanoid()}
          mode={SmartTagMode.COMMUNITY_TAG}
          tagId={item.tagId}
          label={item.tagName}
        />
      ))}

      {windowInnerWidth <= 880 && dappletState && (
        <button
          type="button"
          data-testid="cross-button"
          className={styles.button}
        >
          +
        </button>
      )}
    </div>
  )
}

export default DappletTags
