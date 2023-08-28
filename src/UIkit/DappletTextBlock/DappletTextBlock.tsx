import { FC } from 'react'

import { combineClasses as cc } from 'utils/combineClasses'

import styles from './DappletTextBlock.module.css'

export interface DappletTextBlockProps {
  userStyles?: string
  title: string
  text: string
}

const DappletTextBlock: FC<DappletTextBlockProps> = ({
  userStyles = '',
  title,
  text,
}) => {
  return (
    <div className={cc([styles.root, userStyles])}>
      <span className={styles['title']}>{title}</span>

      <span className={styles['text']}>{text}</span>
    </div>
  )
}

export default DappletTextBlock
