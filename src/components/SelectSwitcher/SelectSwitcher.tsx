import { FC, useEffect, useState, MouseEvent } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { EOrderBy, orderDapplets, setOrderBy } from 'store/slices/dappletsSlice'
import SvgIcon from 'uikit/SvgIcon'
import { combineClasses as cc } from 'utils/combineClasses/combineClasses'

import styles from './SelectSwitcher.module.css'

export interface SelectSwitcherProps {
  userStyles?: string
}

const SelectSwitcher: FC<SelectSwitcherProps> = ({ userStyles = '' }) => {
  const { orderBy } = useAppSelector(state => state.dapplets)

  const [isOpenedDropDown, setIsOpenedDropDown] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(orderDapplets())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy])

  const openCloseDropDown = () => setIsOpenedDropDown(!isOpenedDropDown)

  const changeOrderBy = (
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
  ) => {
    dispatch(setOrderBy(e.currentTarget.innerText as EOrderBy))
    openCloseDropDown()
  }

  return (
    <div className={cc([styles.root, userStyles])}>
      <div className={styles['span-wrapper']} onClick={openCloseDropDown}>
        <span
          style={orderBy ? { padding: 0 } : { padding: 0, color: '#7F7F7F' }}
        >
          {orderBy ? orderBy : 'orderBy'}
        </span>

        <SvgIcon icon={'arrowDown'} />
      </div>

      {isOpenedDropDown && (
        <div className={styles['drop-down']} onMouseLeave={openCloseDropDown}>
          <div
            className={styles['option']}
            style={{
              borderTopRightRadius: '10px',
              borderTopLeftRadius: '10px',
            }}
          >
            <span
              style={
                orderBy === EOrderBy.ASC_BY_NAME
                  ? {
                      color: '#7F7F7F',
                    }
                  : {}
              }
              onClick={changeOrderBy}
            >
              {EOrderBy.ASC_BY_NAME}
            </span>
          </div>

          <span
            className={styles['option']}
            style={
              orderBy === EOrderBy.DESC_BY_NAME ? { color: '#7F7F7F' } : {}
            }
            onClick={changeOrderBy}
          >
            {EOrderBy.DESC_BY_NAME}
          </span>

          <span
            className={styles['option']}
            style={
              orderBy === EOrderBy.ASC_BY_MARKET_CAP ? { color: '#7F7F7F' } : {}
            }
            onClick={changeOrderBy}
          >
            {EOrderBy.ASC_BY_MARKET_CAP}
          </span>

          <div
            className={styles['option']}
            style={{
              borderBottomRightRadius: '10px',
              borderBottomLeftRadius: '10px',
            }}
            onClick={changeOrderBy}
          >
            <span
              style={
                orderBy === EOrderBy.DESC_BY_MARKET_CAP
                  ? { color: '#7F7F7F' }
                  : {}
              }
              onClick={changeOrderBy}
            >
              {EOrderBy.DESC_BY_MARKET_CAP}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectSwitcher
