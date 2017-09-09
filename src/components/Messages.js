import React from 'react'
import { Container, List } from 'semantic-ui-react'

const Messages = (props) => {

  return(
    <Container className="scroller">
      <List celled animated>
        {props.messages.map( (message, index) => {
          return(
            <List.Item key={index}>
              <List.Description>
                {message.username}: {message.content}
              </List.Description>
            </List.Item>
          )
        })}
        <List.Item>
          <div style={{float:"left", clear:"both"}} ref={(el) => {this.messagesEnd = el;}} />
        </List.Item>
      </List>
    </Container>
  )
}

export default Messages
