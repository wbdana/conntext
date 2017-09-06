import React from "react"
import { Header } from 'semantic-ui-react'

const APIURL = () => (
  "https://conntext-api.herokuapp.com/api/v1"
)

// For spinning logo, className="App-logo"
const SiteHeader = () => (
  <div className="SiteHeader">
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
export {SiteHeader}
