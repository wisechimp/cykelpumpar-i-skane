import React from 'react'

import LinkButton from 'components/LinkButton/LinkButton'

interface MapPopupProps {
  name: string,
  address: string,
  reference?: string
}

const MapPopup = ({ name, address, reference }: MapPopupProps) => (
  <div>
    <h3>{name}</h3>
    <p>{address}</p>
    <LinkButton target={`/cyclepumps/${reference}`} text='See Pump' />
  </div>
)

export default MapPopup