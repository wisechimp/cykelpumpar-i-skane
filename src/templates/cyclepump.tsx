import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { IGatsbyImageData, getImage, StaticImage } from 'gatsby-plugin-image'

import Layout from 'components/Layout/Layout'
import LinkButton from 'components/LinkButton/LinkButton'
import * as styles from './cyclepump.module.css'
// import SwipeableImageView from 'components/SwipeableImageView/SwipeableImageView'

interface CyclePumpPageData {
  data: {
    mdx: {
      frontmatter: {
        name: string,
        status: boolean,
        images: Array<IGatsbyImageData>,
        lat: number,
        lng: number
      },
      body: string
    }
  }
}

const CyclePump = ({ data }: CyclePumpPageData) => {
  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
  const { frontmatter, body } = data.mdx
  const { name, status, images, lat, lng } = frontmatter
  const staticMapApi = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lng},${lat},9.67,0.00,0.00/1000x600@2x?access_token=${mapboxToken}`
  console.log(images)
  const image0 = getImage(images[0])
  const image1 = getImage(images[1])
  const image2 = getImage(images[2])

  return (
    <Layout pageTitle={name} bannerVisibility>
      {/* <SwipeableImageView images={[image0, image1, image2]} /> */}
      <StaticImage src={staticMapApi} alt={`A map of the ${name} cycle pump`} />
      <div>
          <MDXRenderer>{body}</MDXRenderer>
      </div>
      {status ? 
        (<div className={styles.pumpActiveButtons}>
          <p className={styles.pumpStatusActive}>Status: Active</p>
          <LinkButton target="/contact" text="Report Issue"></LinkButton>
        </div>)
        : (<p className={styles.pumpStatusInactive}>Status: Inactive</p>)
      }
    </Layout>
  )
}

export default CyclePump

export const query = graphql`
  query PostsById($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        name
        status
        lat
        lng
        images {
          childImageSharp {
            gatsbyImageData (
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`