import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { TSP } from './PageAssets'

const About = () => {
  return(
    <Container className="about">
      <TSP />
      <Header size="medium">About</Header>

      <Header size="small">About Connected Text</Header>
      <ul>
        <li>Connected Text (ConnText) is a work-in-progress text editor for programmers.</li>

        <li>Features
          <ol>
            <li>Multi-user live text editing (like Google Docs);</li>
            <li>Live chatrooms for each file to facilitate communication for collaboration.</li>
          </ol>
        </li>

        <li>Planned features:
          <ol>
            <li>Pull files from GitHub repos.</li>
          </ol>
        </li>
        <li>Stretch goals that may or may not be implemented at a later date:
          <ol>
            <li>Full GitHub integration, including login/signup and ability to open full repos;</li>
            <li>Ability to have multiple files open at once in tabs</li>
            <li>Ability to create and push commits to GitHub directly from ConnText.</li>
          </ol>
        </li>
      </ul>



      <Header size="small">Current Recommended Usage of Connected Text</Header>
      <ul>
        <li>File naming conventions:
          <ul>
            <li>File naming conventions: Currently, Connected Text does not support repository/folder structures for your saved files. As such, we recommend that you add your full file path to your file name. For example, instead of 'Login', use 'repo_name/src/components/Login'.</li>
            <li>However, Connected Text will append the appropriate file extension for you. Just select the desired language in the Editor and Connected Text will do the rest!</li>
          </ul>
        </li>
      </ul>
    </Container>
  )
}

export default About
