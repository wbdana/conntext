import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const About = () => {
  return(
    <Container className="about" id="about">
      <Header size="medium" id="abouta">About</Header>

      <Header size="small" id="aboutb">About Connected Text</Header>
      <ul>
        <li>Connected Text (ConnText) is a work-in-progress text editor for programmers.</li>

        <li>Features:
          <ol>
            <li>Multi-user live text editing (like Google Docs);</li>
            <li>Live chatrooms for each file to facilitate communication for collaboration;</li>
            <li>Pull files from GitHub repos through GitFetch.</li>
          </ol>
        </li>
        <li>Stretch goals that may or may not be implemented at a later date:
          <ol>
            <li>Ability to have multiple files open at once in tabs;</li>
            <li>Full GitHub integration (whatever that means!).</li>
          </ol>
        </li>
      </ul>



      <Header size="small">Current Recommended Usage of Connected Text</Header>
      <ul>
        <li>Editor: Use New to create a new file, or grab one off of GitHub with GitFetch (see below). You can access the file again from Home or your My Files page.</li>
        <li>My Files: Access your files from My Files. Click any file to open it in the Editor.</li>
        <li>Shared Files: Files that other Connected Text users have shared with you will appear in your Shared Files. You can edit these files, add or remove further collaborators, and chat from the Editor page for a shared file. Note that collaborators on a file have all of the same permissions to the file as the owner of the file, except for permission to delete the file.</li>
        <li>User Directory: View and search for other Connected Text users in the User Directory. Clicking on a user will bring you to their profile page. User profiles display a user's created and shared files. Clicking on any of these files will open the file in read only mode ("/noeditor"). If you would like to edit a file for which you do not have collaborator permissions, you can click "Save as New File" in the read-only editor to "fork" the file to your account.</li>
        <li>Sharing files: From a file's Editor page, you can add a collaborator to that file by entering their username (must be exact) in the appropriate field. Shared files will appear in your collaborator's Shared Files</li>
        <li>File naming conventions: Currently, Connected Text does not support repository/folder structures for your saved files. As such, we recommend that you add your full file path to your file name. For example, instead of 'Login', use 'repo_name/src/components/Login.js'.</li>
        <li>Syntax highlighting: Simply select the language you need to enable syntax highlighting in the Editor.</li>
        <li>GitFetch: Use GitFetch to grab files from GitHub. Searching for a GitHub username will render a list of their repositories; clicking a repository will render a list of files in that repository. Click any file to "fork" it to your Connected Text account! Note: Presently, users with under 30 public repositories on GitHub will not appear. I am aware of this issue and will be working on a fix ASAP.</li>
        <li>GitFetch Direct: Use GitFetch Direct to grab files directly from GitHub. Simply enter the repository owner's username, the name of the repo, and the full file path (including extension) of the repo. For example:
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
