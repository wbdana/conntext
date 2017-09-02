import React from 'react'
import { List } from 'semantic-ui-react'
import { APIURL } from './PageAssets'

class AllFiles extends React.Component {

  grabAllFiles = () => {
    const options = {
      "method": "get",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch(`${APIURL()}/records`, options)
      .then(resp => resp.json())
      .then(json => console.log(json))
  }

  componentDidMount(){
    this.grabAllFiles()
  }

  render(){
    return(
      <List divided relaxed>
        <List.Item>
        </List.Item>
      </List>
    )
  }

}

export default AllFiles
