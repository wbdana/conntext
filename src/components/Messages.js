import React from 'react'
import { Container, List } from 'semantic-ui-react'

const Messages = (props) => {

  return(
    <Container>
      <List>
        {props.messages.map( (message, index) => {
          return(
            <List.Item key={index}>
              <List.Description>
                {message.username}: {message.content}
              </List.Description>
            </List.Item>
          )
        })}
      </List>
    </Container>
  )
}

export default Messages
