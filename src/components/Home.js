import React from 'react'
import { Container, Image, Grid, Header, Card, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP } from './PageAssets'
import HomeCable from './HomeCable'

class Home extends React.Component {
  state = {
    user: {},
    createdRecords: [],
    partnerRecords: [],
    openCable: true
  }

  grabUserData = (props) => {
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
      }))
  }

  componentDidMount(){
    this.grabUserData()
    this.setState({
      openCable: true
    })
  }

  updateHome = (data) => {
    this.setState({
      user: data.user,
      createdRecords: [...data.created_records],
      partnerRecords: [...data.partner_records]
    })
  }

  render() {
    return(
      <div className="homepage">
        <Container>
          <TSP/>
          <Grid celled container columns={3}>
            <Grid.Row>
              <Grid.Column width={4}>
                <Card>
                  <Card.Header>
                    <Image src={this.state.user.profile_image_url} />
                  </Card.Header>
                </Card>
              </Grid.Column>
              <Grid.Column width={6}>
                <TSP/>
                <Header size='medium'>Welcome to Connected Text, {this.state.user.email}</Header>
                <Card.Group className='homeRecords'>
                  {this.state.createdRecords.map((file, index)=>{
                    return(
                      <Card fluid key={index} href='#na'>
                        <NavLink to={`/editor/${file.id}`} exact>
                          <Icon name='github' size='large' verticalAlign='middle' color='black' />
                          <Card.Content>
                            <Card.Header size='medium' id='recordsCardHeader' color='black'>
                              <p><strong>{file.name}</strong></p>
                            </Card.Header>
                            <Card.Description>
                              Last updated {file.updated_at}
                            </Card.Description>
                          </Card.Content>
                        </NavLink>
                      </Card>
                    )
                  })}
                </Card.Group>
              </Grid.Column>
              <Grid.Column width={6}>
                <TSP/>
                <Header size='medium'></Header>
                <Header size='small'>Shared Files</Header>
                <Card.Group className='homeRecords'>
                  {this.state.partnerRecords.map((file, index)=>{
                    return(
                      <Card fluid key={index} href='#na'>
                        <NavLink to={`/editor/${file.id}`} exact>
                          <Icon name='github' size='large' verticalAlign='middle' color='black' />
                          <Card.Content>
                            <Card.Header size='medium' id='recordsCardHeader' color='black'>
                              <p><strong>{file.name}</strong></p>
                            </Card.Header>
                            <Card.Description>
                              Last updated {file.updated_at}
                            </Card.Description>
                          </Card.Content>
                        </NavLink>
                      </Card>
                    )
                  })}
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        {this.state.openCable === true && <HomeCable
          updateWSContent={this.props.updateWSContent}
          updateHomeWSContent={this.updateHome}
          data-cableApp={this.props['data-cableApp']}
          userId={this.props.userId}
        />}

      </div>
    )
  }
}

export default Home
