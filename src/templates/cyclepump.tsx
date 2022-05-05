import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { IGatsbyImageData, GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from 'components/Layout/Layout'
import LinkButton from 'components/LinkButton/LinkButton'
import * as styles from './cyclepump.module.css'
import Carousel from 'components/Carousel/Carousel'

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
    },
    cyclePump : {
      id: string,
      geometry: Array<number>,
      localFile: IGatsbyImageData
    }
  }
}

const CyclePump = ({ data }: CyclePumpPageData) => {
  const { frontmatter, body } = data.mdx
  const { name, status, images } = frontmatter
  const pumpImage = getImage(data.cyclePump.localFile)
  console.log(images)

  return (
    <Layout pageTitle={name} bannerVisibility>
      {pumpImage 
        ? <GatsbyImage className={styles.pumpImage} image={pumpImage} alt="A map of a cycle pump perhaps?" />
        : <p>There's been a processing problem here!</p>}
      <Carousel startingImage={1}>
        {images.map((image: IGatsbyImageData, index) => {
					return(
						<GatsbyImage key={index} image={getImage(image)!} alt="An image"/>
					)
				})}
      </Carousel>
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
    cyclePump(id: {eq: "0c45395c-95e0-5090-93d4-5c50d6f65a5b"}) {
    id
    geometry {
      coordinates
    }
    localFile {
      childImageSharp {
        gatsbyImageData(
          width: 400
          height: 320
        )
      }
    }
  }
  }
`