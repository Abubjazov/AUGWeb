import { FC } from 'react'

// import DateSwitcher from 'uikit/DateSwitcher'
import SearchInput from 'uikit/SearchInput'
import SelectSwitcher from 'uikit/SelectSwitcher'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './SearchGroup.module.css'

export interface SearchGroupProps {
  userStyles?: string
}

const SearchGroup: FC<SearchGroupProps> = ({ userStyles = '' }) => {
  return (
    <div className={cc([styles.root, userStyles])}>
      <SearchInput placeholder={'Search'} />

      <SelectSwitcher userStyles={styles['margin']} />
    </div>
  )
}

export default SearchGroup
