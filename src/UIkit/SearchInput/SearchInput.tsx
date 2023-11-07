import { FC, useEffect, useState } from 'react'

import useDebounce from 'hooks/useDebounce/useDebounce'
import { useAppDispatch } from 'store/hooks'
import { setSearchString } from 'store/slices/dappletsSlice'
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
  const dispatch = useAppDispatch()

  const [inputValue, setInputValue] = useState('')

  const debouncedValue = useDebounce(inputValue, 300)

  useEffect(() => {
    dispatch(setSearchString(debouncedValue))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  return (
    <div className={cc([styles.root, userStyles])}>
      <SvgIcon userStyles={styles.glass} icon={'glass'} />

      <input
        type="text"
        name="searchinput"
        maxLength={30}
        placeholder={placeholder}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
