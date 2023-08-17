import { FC } from 'react'

import Dapplet, { IDapplet } from 'components/Dapplet/Dapplet'
import { nanoid } from 'nanoid'
import { combineClasses as cc } from 'utils/combineClasses'

import styles from './DappletsGroup.module.css'

interface DappletsGroupProps {
  userStyles?: string
  dapplets: IDapplet[]
}

const DappletsGroup: FC<DappletsGroupProps> = ({
  userStyles = '',
  dapplets,
}) => {
  return (
    <div className={cc([styles.root, userStyles])}>
      {dapplets.map(item => (
        <Dapplet key={nanoid()} dapplet={item} />
      ))}
    </div>
  )
}

export default DappletsGroup
