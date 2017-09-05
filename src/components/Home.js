import React from 'react'
import { Image, Grid, Header, List } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP, FSP } from './PageAssets'

class Home extends React.Component {
  state = {
    user: {},
    createdRecords: [],
    partnerRecords: []
  }

  grabUserData = (props) => {
    console.log('Grabbing!')
    const options = {
      "method": "get",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch(`${APIURL()}/users/${this.props.userId}`, options)
      .then(resp => resp.json())
      .then(json => this.setState({
        user: json.user,
        createdRecords: json.created_records,
        partnerRecords: json.partner_records
      }, ()=>{console.log(this.state)}))
  }

  componentDidMount(){
    this.grabUserData()
  }

  getFileExtension = (file) => {
    switch (file.language) {
      case 'ruby':
        return '.rb'
      case 'javascript':
        return '.js'
      case 'python':
        return '.py'
      case 'csharp':
        return '.cs'
      case 'xml':
        return '.xml'
      case 'markdown':
        return '.md'
      case 'css':
        return '.css'
      case 'html':
        return '.html'
      default:
        return '.rb'
    }
  }

  render() {
    console.log('Rendering!')
    return(
      <div className="userShowPage">
        <TSP/>
        <Grid>
          <Grid.Column width={4}>
            <Image src={this.state.user.profile_image_url} />
          </Grid.Column>
          <Grid.Column width={9}>
            <TSP/>
            <Header size='medium'>Welcome to Connected Text, {this.state.user.email}</Header>
          </Grid.Column>
          <Grid.Column width={3}>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Home
