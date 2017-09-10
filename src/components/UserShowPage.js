import React from 'react'
import { Image, Grid, Header, List, Container } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { TSP, FSP } from './PageAssets'

class UserShowPage extends React.Component {
  state = {
    user: this.props.viewUser.user,
    createdRecords: this.props.viewUser.createdRecords,
    partnerRecords: this.props.viewUser.partnerRecords
  }

  componentWillUnmount(){
    this.props.resetViewUser()
  }

  render() {
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
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                          <List.Header  id={file.id}>{file.name}</List.Header>
                          <List.Description>Last updated {file.updated_at}</List.Description>
                        </List.Content>
                      </List.Item>
                    )
                  })}
                </List>
            </Grid.Column>
            <Grid.Column width={6}>
              <FSP/>
              <Header size='small'>Partner Files</Header>
                <List divided relaxed link>
                  {this.state.partnerRecords.map( (file, index) => {
                    return(
                      <List.Item key={index}>
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                          <List.Header  id={file.id}>{file.name}</List.Header>
                          <List.Description>Last updated {file.updated_at}</List.Description>
                        </List.Content>
                      </List.Item>
                    )
                  })}
                </List>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default UserShowPage
