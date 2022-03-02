import React from 'react'

import Layout from 'components/Layout/Layout'

const Testing = () => (
  <Layout pageTitle='Testing Page' advertVisibility>
    <p>This is testing time. Adding a file resulted in a new build as anticipated (hoped!).</p>
    <p>Let's edit this page and try adding a commit message to the circleCI asking it to nicely skip running tests on the gh-pages branch again.</p>
    <p>We should check that the gatsby-node has updated satisfactorily.</p>
  </Layout>
)

export default Testing