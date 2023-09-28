import { FC, memo, useEffect } from 'react'

import Dapplet from 'components/Dapplet/Dapplet'
import { nanoid } from 'nanoid'
import { getDapplets } from 'services/dapplets/dapplets'
import { useAppSelector } from 'store/hooks'
import { useAppDispatch } from 'store/hooks'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './DappletsGroup.module.css'

export interface DappletsGroupProps {
  userStyles?: string
}

const DappletsGroup: FC<DappletsGroupProps> = ({ userStyles = '' }) => {
  const allDapplets = useAppSelector(state => state.dapplets.dapplets)

  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getDapplets())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   console.log(allDapplets)
  // }, [allDapplets])

  return (
    <div className={cc([styles.root, userStyles])}>
      {allDapplets.map(item => (
        <Dapplet key={nanoid()} dapplet={item} />
      ))}
    </div>
  )
}

export default memo(DappletsGroup)
