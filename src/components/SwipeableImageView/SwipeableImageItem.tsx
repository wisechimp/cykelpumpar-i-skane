import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

import * as styles from './swipeableimageview.module.css'

const SwipeableImageItem = ({ image }) => {
  return (
    <div className={styles.swipeableItem}><GatsbyImage alt={''} image={image} /></div>
  )
}

export default SwipeableImageItem