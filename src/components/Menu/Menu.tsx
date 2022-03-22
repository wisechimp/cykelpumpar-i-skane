import React from 'react'
import { Link } from 'gatsby'
import { FaChevronLeft } from 'react-icons/fa'

import * as styles from './menu.module.css'

interface MenuProps {
  pageTitle: string
}

const Menu = ({ pageTitle }: MenuProps) => (
  <div className={styles.actionBar}>
    <Link to="/">
      <FaChevronLeft />
    </Link>
    <h3>{pageTitle}</h3>
  </div>
)

export default Menu