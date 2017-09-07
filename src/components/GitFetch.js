import React from 'react'
import { Container, Input, Button } from 'semantic-ui-react'
import { APIURL } from './PageAssets'

class GitFetch extends React.Component {
  state = {
    githubUsername: '',
    repoName: '',
    filePath: ''
  }

  updateGithubUsername = (event, data) => {
    this.setState({
      githubUsername: data.value
    })
  }

  updateRepoName = (event, data) => {
    this.setState({
      repoName: data.value
    })
  }

  updateFilePath = (event, data) => {
    this.setState({
      filePath: data.value
    })
  }

  render() {
    return(
      <Container className="gitFetch">
        <Input label='GitHub Username' type='text' onChange={this.updateGithubUsername} />
        <Input label='Repo Name' type='text' onChange={this.updateRepoName} />
        <Input label='Full file path (with extension)' type='text' onChange={this.updateFilePath} />
      </Container>
    )
  }
}

export default GitFetch
