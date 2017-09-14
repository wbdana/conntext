import React from 'react'
import base64 from 'base-64'
import { Redirect, NavLink } from 'react-router-dom'
import { Container, Input, Button, Card, Icon } from 'semantic-ui-react'
import { APIURL, TSP } from './PageAssets'

class GitFetch extends React.Component {
  state = {
    githubUsername: '',
    repoName: '',
    filePath: '',
    recordId: '',
    userRepos: [],
    repoSearchTerm: '',
    redirect: false,
    showRepos: false,
    activeRepo: '',
    repoBranches: [],
    sha: '',
    files: [],
    showFiles: false,
    fileSearchTerm: ''
  }


  componentWillUnmount(){
    this.setState({
      githubUsername: '',
      repoName: '',
      filePath: '',
      recordId: '',
      redirect: false,
      showRepos: false
    })
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

  updateRepoSearchTerm = (event, data) => {
    this.setState({
      repoSearchTerm: data.value
    })
  }

  updateFileSearchTerm = (event, data) => {
    this.setState({
      fileSearchTerm: data.value
    })
  }

  resetGitFetch = () => {
    this.setState({
      githubUsername: '',
      repoName: '',
      filePath: '',
      recordId: '',
      userRepos: [],
      repoSearchTerm: '',
      redirect: false,
      showRepos: false,
      repoBranches: [],
      sha: '',
      files: [],
      showFiles: false,
      fileSearchTerm: ''
    })
  }

  loadFile = (event, data) => {
    const options = {
      "method": "get",
      "headers": {
        "Authorization": "token be08da03fd41d99746b66e1c515fe27be2a153cc", // read only
        "content-type": "application/json",
        "accept": "application/vnd.github.v3+json"
      }
    }
    fetch(`https://api.github.com/repos/${this.state.githubUsername}/${this.state.activeRepo}/contents/${data.value}`, options)
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
          .then(json => this.setState({
            recordId: json.record.id,
            redirect: true
          }))
      })
      .catch(err => alert('Could not fetch this file from GitHub as specified! See About for assistance.'))
  }

  fetchUserRepos = () => {
    const options = {
      "method": "HEAD",
      "headers": {
        "Authorization": "token be08da03fd41d99746b66e1c515fe27be2a153cc"
      }
    }
    const parse = require('parse-link-header')
    fetch(`https://api.github.com/users/${this.state.githubUsername}/repos?sort=pushed`, options)
      .then(json => {
        const pageHeaders = json.headers.get('Link')
        return pageHeaders
      })
      .then(pageHeaders => {
        const parsed = parse(pageHeaders)
        return parsed
      })
      .then(parsed => {
        let i;
        const userRepoOptions = {
          "method": "get",
          "headers": {
            "Authorization": "token be08da03fd41d99746b66e1c515fe27be2a153cc", // read only
            "content-type": "application/json",
            "accept": "application/vnd.github.v3+json"
          }
        }
        for (i = 1; i < parseInt(parsed.last.page, 10) + 1; i++) {
          fetch(`https://api.github.com/users/${this.state.githubUsername}/repos?page=${i}`, userRepoOptions)
            .then(resp => resp.json())
            .then(json => {
              this.setState({
                userRepos: [...this.state.userRepos, ...json]
              })
            })
        }
      })
      .then(ret => this.setState({showRepos: true}))
      .catch(err => alert('Could not find this user. In fact, that user probably does not exist.'))
  }

  fetchRepoFiles = (event, data) => {
    const options = {
      "method": "get",
      "headers": {
        "Authorization": "token be08da03fd41d99746b66e1c515fe27be2a153cc", // read only
        "content-type": "application/json",
        "accept": "application/vnd.github.v3+json"
      }
    }
    this.setState({
      activeRepo: data.value
    }, () => {
      fetch(`https://api.github.com/repos/${this.state.githubUsername}/${this.state.activeRepo}/branches`, options)
        .then(resp => resp.json())
        // .then(json => console.log(json))
        .then(json => this.setState({
          sha: json.filter(branch => {return branch.name === "master"})[0].commit.sha
        }, () => {
          fetch(`https://api.github.com/repos/${this.state.githubUsername}/${this.state.activeRepo}/git/trees/${this.state.sha}?recursive=1`, options)
            .then(resp => resp.json())
            // .then(json => console.log(json))
            .then(json => this.setState({
              files: [...json.tree.filter((item) => {return item.type === "blob"})],
              showRepos: false,
              showFiles: true
            }))
        }))
    })
  }

  render() {
    return(
      <Container>
        <Container textAlign='center' className="gitFetch">
          <div className='gitfetchlink'>Know exactly what you need? <NavLink to="/gitfetchdirect" exact>Try GitFetch Direct instead!</NavLink></div>
          {this.state.redirect === true && <Redirect to={`/editor/${this.state.recordId}`} />}
          <TSP />
          <Input fluid placeholder='wbdana' label='GitHub Username' type='text' onChange={this.updateGithubUsername} value={this.state.githubUsername} />
          <TSP />
          <Button onClick={this.fetchUserRepos}>GitFetch!</Button>
          <Button onClick={this.resetGitFetch}>Reset</Button>
        </Container>
        <br/><br/>
        <Container className='repoList'>
          {this.state.showRepos === true && <Input fluid placeholder='Search repos...' label='Repo Search' type='text' onChange={this.updateRepoSearchTerm} value={this.state.repoSearchTerm} />}
          <br/><br/>
          <Card.Group className='gitfetchcards'>
            {this.state.showRepos === true && this.state.userRepos.filter(repo => {return repo.name.toLowerCase().includes(this.state.repoSearchTerm.toLowerCase())}).map( (repo, index) => {
              return(
                <Card fluid key={index} href='#' onClick={this.fetchRepoFiles} value={repo.name}>
                  <Icon name='github' size='large' verticalAlign='middle' color='black' />
                  <Card.Content>
                    <Card.Header size='medium' id='recordsCardHeader' color='black'>
                      <p id='strong'><strong>{repo.name}</strong></p>
                    </Card.Header>
                    <Card.Description>
                      Last updated {repo.updated_at}
                    </Card.Description>
                  </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
          {this.state.showFiles === true && <Input fluid placeholder='Search files...' label='File Search' type='text' onChange={this.updateFileSearchTerm} value={this.state.fileSearchTerm} />}
          <br/><br/>
          <Card.Group  className='gitfetchcards'>
            {this.state.showFiles === true && this.state.files.filter(file => {return file.path.toLowerCase().includes(this.state.fileSearchTerm.toLowerCase())}).map( (file, index) => {
              return(
                <Card fluid key={index} href='#' onClick={this.loadFile} value={file.path}>
                  <Icon name='github' size='large' verticalAlign='middle' color='black' />
                  <Card.Content>
                    <Card.Header size='medium' id='recordsCardHeader' color='black'>
                      <p id='strong'><strong>{file.path}</strong></p>
                    </Card.Header>
                  </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
        </Container>
      </Container>
    )
  }
}

export default GitFetch
