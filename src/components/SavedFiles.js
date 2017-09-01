import React from 'react'
import { List } from 'semantic-ui-react'

const SavedFiles = (props) => {

  // fetch()



  return(
    <List divided relaxed>
      <List.Item>
        <List.Icon name='github' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header as='a'>FILE NAME.extension</List.Header>
          <List.Description as='a'>Updated X minutes ago</List.Description>
        </List.Content>
      </List.Item>
    </List>
  )
}

export default SavedFiles
