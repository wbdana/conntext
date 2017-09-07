import React from 'react'
import base64 from 'base-64'
import { Container, Input, Button } from 'semantic-ui-react'
import { APIURL, TSP } from './PageAssets'
import { GHTK } from '../.secret.js'

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

  fetchFile = () => {
    console.log(this.state)
    console.log(`https://api.github.com/repos/${this.state.githubUsername}/${this.state.repoName}/contents/${this.state.filePath}`)
    const options = {
      "method": "get",
      "headers": {
        "Authorization": `${GHTK}`,
        "content-type": "application/json",
        "accept": "application/vnd.github.v3+json"
      }
    }
    const newOptions = {
      "method": "post",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },

    }
    fetch(`https://api.github.com/repos/${this.state.githubUsername}/${this.state.repoName}/contents/${this.state.filePath}`, options)
      .then(resp => resp.json())
      .then(json => console.log(base64.decode(json.content.replace(/^\s+|\s+$/gm, '').split('\n').join(''))))
  }

  render() {
    return(
      <Container className="gitFetch">
        <TSP />
        <Input label='GitHub Username' type='text' onChange={this.updateGithubUsername} />
        <TSP />
        <Input label='Repo Name' type='text' onChange={this.updateRepoName} />
        <TSP />
        <Input label='Full file path (with extension)' type='text' onChange={this.updateFilePath} />
        <TSP />
        <Button onClick={this.fetchFile}>GitFetch!</Button>
      </Container>
    )
  }
}

export default GitFetch
