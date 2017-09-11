import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const About = () => {
  return(
    <Container className="about" id="about">
      <br/><br/>
      <Header size="medium" id="abouta">About</Header>

      <Header size="small" id="aboutb">About Connected Text</Header>
      <ul>
        <li>Connected Text (ConnText) is a work-in-progress text editor for programmers.</li>

        <li>Features
          <ol>
            <li>Multi-user live text editing (like Google Docs);</li>
            <li>Live chatrooms for each file to facilitate communication for collaboration.</li>
            <li>Pull files from GitHub repos through GitFetch.</li>
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
        <li>Editor: Use New to create a new file, or grab one off of GitHub with GitFetch (see below). You can access the file again from Home or your My Files page.</li>
        <li>Sharing files: From a file's Editor page, you can add a collaborator to that file by entering their username (must be exact) in the appropriate field. Shared files will appear in your collaborator's Shared Files</li>
        <li>File naming conventions: Currently, Connected Text does not support repository/folder structures for your saved files. As such, we recommend that you add your full file path to your file name. For example, instead of 'Login', use 'repo_name/src/components/Login.js'.</li>
        <li>Syntax highlighting: Simply select the language you need to enable syntax highlighting in the Editor.</li>
        <li>GitFetch: Use GitFetch to grab files directly from GitHub. Simply enter the repository owner's username, the name of the repo, and the full file path (including extension) of the repo. For example:
          <ul>
            <li>Username: wbdana</li>
            <li>Repo Name: conntext</li>
            <li>File Path: src/App.js</li>
          </ul>
        Files created using GitFetch are automatically saved to your account.
        </li>
        <li>Saving files: Once you have created a file through New or GitFetch, updates to that file will be saved automatically. </li>
        <li>File chat: Each file has its own chatroom associated with it. You can view messages about a file on the Editor page for that file.</li>
      </ul>
    </Container>
  )
}

export default About
