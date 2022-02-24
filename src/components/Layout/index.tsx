import React, { ReactNode } from 'react'
import { PageProps } from 'gatsby'

interface LayoutProps {
  pageTitle: string
  children: ReactNode
}

const Layout = ({pageTitle, children}: LayoutProps) => (
  <div>
    <h1>{pageTitle}</h1>
    {children}
  </div>
)

export default Layout