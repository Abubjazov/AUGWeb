import { FC } from 'react'

import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './SearchInput.module.css'

export interface SearchInputProps {
  userStyles?: string
  placeholder: string
}

const SearchInput: FC<SearchInputProps> = ({
  userStyles = '',
  placeholder,
}) => {
  return (
    <div className={cc([styles.root, userStyles])}>
      <SvgIcon userStyles={styles.glass} icon={'glass'} />

      <input
        type="text"
        name="searchinput"
        maxLength={30}
        placeholder={placeholder}
      />
    </div>
  )
}

export default SearchInput
