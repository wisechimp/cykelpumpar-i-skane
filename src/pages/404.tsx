import * as React from "react"
import { Link } from "gatsby"

const ErrorPage = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <p>This doesn't seem to be the page you're looking for. You can return <Link to="/">here</Link>.</p>
      <Link to="/"></Link>
    </main>
  )
}

export default ErrorPage