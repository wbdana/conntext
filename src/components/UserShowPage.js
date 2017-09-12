import React from 'react'
import { Image, Grid, Header, List, Container } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { TSP, FSP } from './PageAssets'
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
    console.log('Firing on the UserShowPage!')
    this.setState({
      user: data.user,
      createdRecords: [...data.created_records],
      partnerRecords: [...data.partner_records]
    })
  }

  render() {
    console.log(this.props.viewUser.user)
    console.log(this.props.viewUser.createdRecords)
    console.log(this.props.viewUser.partnerRecords)
    return(
      <div className="userShowPage">
        <TSP/>
        <Container>
          <Grid>
            <Grid.Column width={4}>
              <Image src={this.state.user.profile_image_url} />
            </Grid.Column>
            <Grid.Column width={6}>
              <TSP/>
              <Header size='medium'>{this.state.user.email}</Header>
              <Header size='small'>Created Files</Header>
                <List divided relaxed link>
                  {this.state.createdRecords.map( (file, index) => {
                    return(
                      <List.Item key={index}>
                        <NavLink to={`/noeditor/${file.id}`} exact>
                          <List.Icon name='github' size='large' verticalAlign='middle' />
                          <List.Content>
                            <List.Header  id={file.id}>{file.name}</List.Header>
                            <List.Description>Last updated {file.updated_at}</List.Description>
                          </List.Content>
                        </NavLink>
                      </List.Item>
                    )
                  })}
                </List>
            </Grid.Column>
            <Grid.Column width={6}>
              <FSP/>
              <Header size='small'>Shared Files</Header>
                <List divided relaxed link>
                  {this.state.partnerRecords.map( (file, index) => {
                    return(
                      <List.Item key={index}>
                        <NavLink to={`/noeditor/${file.id}`} exact>
                          <List.Icon name='github' size='large' verticalAlign='middle' />
                          <List.Content>
                            <List.Header  id={file.id}>{file.name}</List.Header>
                            <List.Description>Last updated {file.updated_at}</List.Description>
                          </List.Content>
                        </NavLink>
                      </List.Item>
                    )
                  })}
                </List>
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
