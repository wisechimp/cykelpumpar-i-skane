import React from 'react'
import { Link } from 'gatsby'

import * as styles from './displaybanner.module.css'

const DisplayBanner = () => (
  <div className={styles.banner}>
    <Link to="/contact">Your Message Here!</Link>
  </div>
)

export default DisplayBanner