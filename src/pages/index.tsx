import * as React from "react"

import Layout from 'components/Layout'
import Map from 'components/Map'

const HomePage = () => {
  return (
    <Layout pageTitle="Home sweet home!">
      <p>We'll probably have a map here. Goodness knows how I'll TS that in!</p>
      <Map />
    </Layout>
  )}

export default HomePage
