import React, { useEffect, useRef, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'

import mapboxSettings from '../../settings/mapbox-settings'
import * as styles from './cyclepumpmap.module.css'

const CyclePumpMap = () => {
  const [longitude, setLongitude] = useState(mapboxSettings.lng)
  const [latitude, setLatitude] = useState(mapboxSettings.lat)
  const [zoom, setZoom] = useState(mapboxSettings.zoom)

  const mapNode = useRef(null)
  let map: Map
  let marker = null

  useEffect(() => {
    if (!mapNode.current) return

    map = new Map({
      accessToken: process.env.MAPBOX_ACCESS_TOKEN,
      attributionControl: false,
      container: mapNode.current,
      style: "mapbox://styles/wisechimp/ck7bzyusk00uq1iqu32awttdx",
      center: [longitude, latitude],
      zoom
    })

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div>
      <div ref={mapNode} />
    </div>
  )

}

export default CyclePumpMap