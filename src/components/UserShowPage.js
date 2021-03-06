import React from 'react'
import { Image, Grid, Header, Container, Card, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { TSP } from './PageAssets'
import UserCable from './UserCable'

class UserShowPage extends React.Component {
  state = {
    user: this.props.viewUser.user,
    createdRecords: this.props.viewUser.createdRecords,
    partnerRecords: this.props.viewUser.partnerRecords,
    openCable: false
  }

  componentDidMount(){
    this.setState({
      openCable: true
    })
  }

  componentWillUnmount(){
    this.props.resetViewUser()
  }

  updateUserShowPageWSContent = (data) => {
    this.setState({
      user: data.user,
      createdRecords: [...data.created_records],
      partnerRecords: [...data.partner_records]
    })
  }

  render() {
    return(
      <div className="userShowPage">
        <TSP/>
        <Container>
          <Grid>
            <Grid.Column width={4}>
              <Card>
                <Card.Header>
                  <Image src={this.state.user.profile_image_url} />
                </Card.Header>
                <Header size='medium'>{this.state.user.email}</Header>
              </Card>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header size='small'>Created Files</Header>
                <Card.Group className='homeRecords'>
                {this.state.createdRecords.map((file, index)=>{
                  return(
                    <Card fluid key={index}  id='homecard'>
                      <NavLink to={`/noeditor/${file.id}`} exact>
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
              <Header size='small'>Shared Files</Header>
                <Card.Group className='homeRecords'>
                {this.state.partnerRecords.map((file, index)=>{
                  return(
                    <Card fluid key={index}  id='homecard'>
                      <NavLink to={`/noeditor/${file.id}`} exact>
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
          </Grid>
        </Container>

        {this.state.openCable === true && <UserCable
          data-cableApp={this.props['data-cableApp']}
          updateWSContent={this.props.updateWSContent}
          updateUserShowPageWSContent={this.updateUserShowPageWSContent}
        />}

      </div>
    )
  }
}

export default UserShowPage
