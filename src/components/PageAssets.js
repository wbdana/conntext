import React from "react"
import { Header, Loader, Image } from 'semantic-ui-react'

const APIURL = () => (
  "http://localhost:3000/"
)

const SiteHeader = () => (
  <div className="SiteHeader">
    <br/><br/><br/><br/>
    <Header size="huge" className="App-logo">Connected Text</Header>
    <Header size="small">Connected Text</Header>
  </div>
)

export {APIURL}
// export {SiteLogo}
export {SiteHeader}
// export {PageHeader}
// export {SectionHeader}
// export {contentLoader}
// export {SiteFooter}
