import React, { ReactNode } from 'react'

import Advert from 'components/Advert/Advert'
import Menu from 'components/Menu/Menu'

interface LayoutProps {
  pageTitle: string
  children: ReactNode
  advertVisibility: boolean
}

const Layout = ({pageTitle, children, advertVisibility}: LayoutProps) => (
  <div>
    <Menu />
    <h1>{pageTitle}</h1>
    {children}
    {advertVisibility && <Advert />}
  </div>
)

export default Layout