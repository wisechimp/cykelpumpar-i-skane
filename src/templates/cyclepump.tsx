import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from 'components/Layout/Layout'
import * as styles from './cyclepump.module.css'

interface CyclePumpPageData {
  data: {
    mdx: {
      frontmatter: {
        name: string,
        status: boolean
      },
      body: string
    }
  }
}

const CyclePump = ({ data }: CyclePumpPageData) => {
  const { frontmatter, body } = data.mdx
  const { name, status } = frontmatter

  return (
    <Layout pageTitle={name} advertVisibility>
      <div>
          <MDXRenderer>{body}</MDXRenderer>
      </div>
      <div>
        {status ? 
          (<p className={styles.pumpStatusActive}>Status: Active</p>)
          : (<p className={styles.pumpStatusInactive}>Status: Inactive</p>)
        }
      </div>
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
      }
    }
  }
`