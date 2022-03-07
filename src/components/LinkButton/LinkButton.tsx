import { Link } from 'gatsby'
import React from 'react'

import * as styles from './linkbutton.module.css'

interface LinkButtonProps {
  target: string,
  text: string
}

const LinkButton = ({ target, text }: LinkButtonProps) => (
  <div className={styles.button}>
    <Link to={target}>{text}</Link>
  </div>
)

export default LinkButton