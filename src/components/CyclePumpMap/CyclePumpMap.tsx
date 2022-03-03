import React, { useEffect, useRef, MouseEvent } from 'react'
// @ts-ignore
import { Map, EventData, GeolocateControl, Marker, Popup } from '!mapbox-gl'

import mapboxSettings from '../../settings/mapbox-settings'
import MapPopup from 'components/MapPopup/MapPopup'
import ReactDOM from 'react-dom'
import { stringify } from 'querystring'

const CyclePumpMap = () => {
  interface CyclePumpData {
    id: number,
    properties: {
      name: string,
      address: string
    }
  }

  interface EventCoordinates {
    x: number,
    y: number
  }

  const accessToken = process.env.MAPBOX_ACCESS_TOKEN

  const mapNode = useRef(null)
  const cyclePumpPopupRef = useRef(new Popup({ offset: [0, -15] }))

  useEffect(() => {
    console.log(accessToken)
    if (!mapNode.current) return

    const map = new Map({
      accessToken,
      container: mapNode.current,
      style: "mapbox://styles/wisechimp/ck7bzyusk00uq1iqu32awttdx",
      center: [mapboxSettings.lng, mapboxSettings.lat],
      zoom: mapboxSettings.zoom
    })
      .addControl(
        new GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true,
          showUserLocation: true
        })
      )

    map.on('mouseenter', 'cykelpumpar-lund', () => {
      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'cykelpumpar-lund', () => {
      map.getCanvas().style.cursor = ''
    })

    map.on("click", (clickData: EventData)  => {
      console.log("Power click!")
      const { point, lngLat } = clickData

      const mapMarker = null

      const mapMarkerData = fetchMarkerData(map, mapMarker, point)

      if (mapMarkerData) {
        console.log("Clicked Pump's id: " + mapMarkerData[0].id)
        renderPopup(mapMarkerData[0], lngLat).addTo(map)
      } else {
        console.log("There's no pump there my friend")
      }
    })

    return () => {
      map.remove()
    }
  }, [])

  const fetchMarkerData = (map: Map, mapMarker: Marker, point: EventData.point) => {
    if (mapMarker !== null) {
      mapMarker.remove()
    }

    const mapFeatures = map.queryRenderedFeatures(point, {
      layers: ["cykelpumpar-lund"]
    })

    if (!mapFeatures.length) {
      return console.log("No Features")
    }
    return mapFeatures
  }

  const renderPopup= (data: CyclePumpData, lngLat: EventCoordinates) => {
    const { properties } = data
    const { name, address} = properties
    const popupNode = document.createElement("div")
    ReactDOM.render(
      <MapPopup />,
      popupNode
    )
    return cyclePumpPopupRef.current
      .setLngLat(lngLat)
      .setDOMContent(popupNode)
  }

  return (
    <div>
      <div ref={mapNode} />
    </div>
  )

}

export default CyclePumpMap
