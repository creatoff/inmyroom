import React from 'react'

import styles from './style.module.css'

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType
  text?: string
  children?: React.ReactNode
}

export default function ActionBarButton({
  icon: Icon,
  text,
  children,
  ...props
}: IProps) {
  return (
    <button className={styles.button} {...props}>
      {Icon ? <Icon /> : null}
      <span className={styles.text}>{text ?? children}</span>
    </button>
  )
}
