import React, { useRef, useEffect, useState} from 'react'
import { IGatsbyImageData, GatsbyImage, getImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'

import * as styles from './swipeableimageview.module.css'

const SwipeableImageView = ({ images }) => {

  const[swipeableWidth, setSwipeableWidth] = useState(0)
  const swipingContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentSwipingContainer = swipingContainer.current

    console.log(swipingContainer)

    if (currentSwipingContainer && currentSwipingContainer.scrollWidth > 0) {
      const { scrollWidth, offsetWidth } = currentSwipingContainer
      setSwipeableWidth(scrollWidth - offsetWidth)
    }
  }, [swipingContainer])

  return(
    <motion.div ref={swipingContainer} className={styles.swipingContainer} whileTap={{ cursor: "grabbing"}}>
      <motion.div drag='x' dragConstraints={{ right: 0, left: -swipeableWidth}} className={styles.swipingView}>
        {images.map((image: IGatsbyImageData, index:number) => {
          return(
            <motion.div key={index} className={styles.swipeableItem}><GatsbyImage image={image} alt="An image"/></motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default SwipeableImageView
