import { FC, memo } from 'react'

import Dapplet from 'components/Dapplet/Dapplet'
import { nanoid } from 'nanoid'
import { useAppSelector } from 'store/hooks'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './DappletsGroup.module.css'

export interface DappletsGroupProps {
  userStyles?: string
}

const DappletsGroup: FC<DappletsGroupProps> = ({ userStyles = '' }) => {
  const allDapplets = useAppSelector(state => state.dapplets.dapplets)

  return (
    <div className={cc([styles.root, userStyles])}>
      {allDapplets.map(item => (
        <Dapplet key={nanoid()} dapplet={item} />
      ))}
    </div>
  )
}

export default memo(DappletsGroup)
