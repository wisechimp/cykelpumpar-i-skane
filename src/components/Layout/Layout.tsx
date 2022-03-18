import React, { ReactNode } from 'react'

import DisplayBanner from 'components/DisplayBanner/DisplayBanner'
import Menu from 'components/Menu/Menu'

interface LayoutProps {
  pageTitle: string
  children: ReactNode
  bannerVisibility: boolean
}

const Layout = ({pageTitle, children, bannerVisibility}: LayoutProps) => (
  <div>
    <Menu />
    <h1>{pageTitle}</h1>
    {children}
    {bannerVisibility && 
      <div className='display-banner'><DisplayBanner /></div>
    }
  </div>
)

export default Layout