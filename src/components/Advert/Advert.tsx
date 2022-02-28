import React from 'react'
import { Link } from 'gatsby'

import * as styles from './advert.module.css'

const Advert = () => (
  <div className={styles.banner}>
    <Link to="/contact">Your Message Here!</Link>
  </div>
)

export default Advert