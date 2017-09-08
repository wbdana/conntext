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

  // Need to write a "get language from file extension method" here

  getLanguage = (filePath) => {
    if (filePath.includes('.rb')) {
      return 'ruby'
    } else if (filePath.includes('.js')) {
      return 'javascript'
    } else if (filePath.includes('.py')) {
      return 'python'
    } else if (filePath.includes('.cs') && !filePath.includes('.css')) {
      return 'csharp'
    } else if (filePath.includes('.xml')) {
      return 'xml'
    } else if (filePath.includes('.md')) {
      return 'markdown'
    } else if (filePath.includes('.css')) {
      return 'css'
    } else if (filePath.includes('.html')) {
      return 'html'
    } else {
      return 'ruby'
    }
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
    fetch(`https://api.github.com/repos/${this.state.githubUsername}/${this.state.repoName}/contents/${this.state.filePath}`, options)
      .then(resp => resp.json())
      .then(json => {
        const fileContent = base64.decode(json.content.replace(/^\s+|\s+$/gm, '').split('\n').join(''))
        const fileName = `${this.state.repoName}/${json.path}`
        const fileLanguage = this.getLanguage(json.path)
        const newFile = {
          name: fileName,
          content: fileContent,
          language: fileLanguage,
          owner_id: this.props.userId
        }
        return newFile
      })
      .then(newFile => {
        const newOptions = {
          "method": "post",
          "headers": {
            "content-type": "application/json",
            "accept": "application/json"
          },
          "body": JSON.stringify(newFile)
        }
        fetch(`${APIURL()}/records`, newOptions)
          .then(resp => resp.json())
          .then(json => console.log(json))
      })
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
