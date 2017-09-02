import React from "react"
import { Header, Loader, Image } from 'semantic-ui-react'

const APIURL = () => (
  "http://localhost:3000/api/v1"
)

// For spinning logo, className="App-logo"
const SiteHeader = () => (
  <div className="SiteHeader">
    <Header size="huge">ConnText</Header>
    <Header size="small">Connected Text</Header>
  </div>
)

const TSP = () => (
  <div className="TSP">
    <br/><br/>
  </div>
)

const FSP = () => (
  <div className="FSP">
    <br/><br/><br/><br/>
  </div>
)

export {APIURL}
export {FSP}
export {TSP}
// export {SiteLogo}
export {SiteHeader}
// export {PageHeader}
// export {SectionHeader}
// export {contentLoader}
// export {SiteFooter}
