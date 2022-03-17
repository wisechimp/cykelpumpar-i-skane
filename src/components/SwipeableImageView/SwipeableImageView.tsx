import React, { useState, useEffect, MouseEvent, useRef } from 'react'

import SwipeableImageItem from './SwipeableImageItem'
import * as styles from './swipeableimageview.module.css'

const SwipeableImageView = ({ images }) => {
  const [activeImageNumber, setActiveImageNumber] = useState(1)
  const [mouseDown, setMouseDown] = useState(false)
  const [initialXCoordinate, setInitialXCoordinate] = useState(0)
  const [finalXCoordinate, setFinalXCoordinate] = useState(0)

  const swipeRef = useRef(null)

  useEffect (() => {
    if (!swipeRef.current) return 
      swipeRef.current.onmousedown = handleMouseDown(event)
      swipeRef.current.onmousemove = handleSwiping(event)
  }, [])

  const handleMouseDown = (event: MouseEvent) => {
    setMouseDown
    setInitialXCoordinate(event.pageX)
    console.log(initialXCoordinate)
  }

  const handleSwiping = (event: MouseEvent) => {
    if (mouseDown) {
      setFinalXCoordinate(event.pageX)
      console.log(finalXCoordinate)
    } else {
      console.log("No image selected for swiping")
    }
  }

  /* const divSelectHandler = (event: MouseEvent) => {
    console.log("Selecting!")
    setMouseDown(true)
    setInitialXCoordinate(event.pageX)
    console.log(`Initial X Coordinate = ${initialXCoordinate}`)
  }

  const swipeHandler = (event: MouseEvent) => {
    if (mouseDown) {
      setFinalXCoordinate(event.pageX)
      console.log(finalXCoordinate)
      setMouseDown(false)
    } else {
      console.log("Mouse is not down")
    }
  } */
  

  const updateActiveImage = (imageNumber: number) => {
    if (imageNumber < 0) {
      imageNumber = 0
    } else if (imageNumber >= images.length()) {
      imageNumber = images.length()
    }
    setActiveImageNumber(imageNumber)
  }

  return(
    <div className={styles.swipingContainer}>
      <div ref={swipeRef} className={styles.swipingView} style={{ transform: `translateX(-${activeImageNumber * 100}%)` }}>
        <SwipeableImageItem image={images[0]} />
        <SwipeableImageItem image={images[1]}/>
        <SwipeableImageItem image={images[2]}/>
      </div>
    </div>
  )
}

export default SwipeableImageView
