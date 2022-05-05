import React, { useState } from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

import * as styles from './carousel.module.css'

interface CarouselProps {
	children: JSX.Element[],
	startingImage: number
}

const Carousel = ({ children, startingImage }: CarouselProps) => {
	const [imageIndex, setImageIndex] = useState(startingImage)
	const [touchPosition, setTouchPosition] = useState(0)
	const imageArrayLength = children.length
	console.log(children)

	const alterImage = (direction: number) => {
		console.log(direction)
		console.log(`We're looking at image ${imageIndex}`)
		if (imageIndex + direction < 0 || imageIndex + direction > imageArrayLength - 1) {
			return
		}

		return setImageIndex(imageIndex + direction)
	}

	const handleTouchStart = (event: React.TouchEvent) => {
		const touchDown = event.touches[0].clientX
		setTouchPosition(touchDown)
	}

	const handleTouchMove = (event: React.TouchEvent) => {
		const touchDown = touchPosition
		console.log(`We're looking at image ${imageIndex}`)

		if (touchDown === 0) {
			return
		}

		const currentTouch = event.touches[0].clientX
		const swipeDistance = touchDown - currentTouch

		if (Math.abs(swipeDistance) > 5) {
			alterImage(swipeDistance/Math.abs(swipeDistance))
		}

		setTouchPosition(0)
	}

	return (
		<div className={styles.carouselContainer}>
			{imageIndex > 0 &&
				<button
					onClick={() => alterImage(-1)} 
					className={styles.leftArrow}
				>
				&lt;
			</button>}
      <div 
				className={styles.carouselContentWrapper}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
			>
      	<div 
					className={styles.carouselContent}
					style={{ 
						transform: `translateX(-${imageIndex * 100}%)`
					}}
				>
          {children}
        </div>
      </div>
			{imageIndex < (imageArrayLength - 1) &&
				<button onClick={() => alterImage(1)} className={styles.rightArrow}>
				&gt;
			</button>} 
    </div>
  )
}

export default Carousel