import React from "react"

import Layout from 'components/Layout/Layout'
import CyclePumpMap from 'components/CyclePumpMap/CyclePumpMap'

const HomePage = () => {
  return (
    <Layout pageTitle="Home sweet home!" bannerVisibility>
      <p>We'll probably have a map here. Goodness knows how I'll TS that in!</p>
      <CyclePumpMap />
    </Layout>
  )}

export default HomePage
