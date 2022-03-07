import React, { useEffect, useRef } from 'react'
// @ts-ignore
import { Map, AttributionControl, EventData, GeolocateControl, Marker, Popup } from '!mapbox-gl'

import mapboxSettings from '../../settings/mapbox-settings'
import MapPopup from 'components/MapPopup/MapPopup'
import ReactDOM from 'react-dom'

const CyclePumpMap = () => {
  interface CyclePumpData {
    id: number,
    properties: {
      name: string,
      address: string,
      reference?: string
    }
  }

  interface EventCoordinates {
    x: number,
    y: number
  }

  const accessToken = process.env.MAPBOX_ACCESS_TOKEN

  const mapNode = useRef(null)
  const cyclePumpMarkerRef = useRef(new Marker())
  const cyclePumpPopupRef = useRef(new Popup({ offset: [0, -15] }))

  useEffect(() => {
    if (!mapNode.current) return

    const map = new Map({
      accessToken,
      attributionControl: false,
      container: mapNode.current,
      style: "mapbox://styles/wisechimp/ck7bzyusk00uq1iqu32awttdx",
      center: [mapboxSettings.lng, mapboxSettings.lat],
      zoom: mapboxSettings.zoom
    })
      .addControl(
        new AttributionControl({
          compact: true
        })
      )
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
      const mapPopup = null
      const mapPopupData = fetchPopupData(map, mapPopup, point)

      if (mapPopupData) {
        console.log("Clicked Pump's id: " + mapPopupData[0].id)
        renderPopup(mapPopupData[0], lngLat).addTo(map)
        renderMarker(lngLat).addTo(map)
      } else {
        console.log("There's no pump there my friend")
        cyclePumpMarkerRef.current.remove()
      }
    })

    return () => {
      map.remove()
    }
  }, [])

  const fetchPopupData = (map: Map, mapPopup: Popup, point: EventData.point) => {
    if (mapPopup !== null) {
      mapPopup.remove()
    }

    const mapFeatures = map.queryRenderedFeatures(point, {
      layers: ["cykelpumpar-lund"]
    })

    if (!mapFeatures.length) {
      return console.log("No Features")
    }
    return mapFeatures
  }

  const renderMarker = (latLng: EventData) => {
    return cyclePumpMarkerRef.current.setLngLat(latLng)
  }

  const renderPopup = (data: CyclePumpData, lngLat: EventCoordinates) => {
    console.log(data)
    const { properties } = data
    const { name, address, reference} = properties
    const popupNode = document.createElement("div")
    ReactDOM.render(
      <MapPopup name={name} address={address} reference={reference} />,
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

