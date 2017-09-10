import React from 'react'
import { Container, List } from 'semantic-ui-react'
import ScrollArea from 'react-scrollbar'

const Messages = (props) => {

  return(
    <Container className="messages">
      <ScrollArea speed={0.8} className="area" contentClassName="content" horizontal={false}>
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
      </ScrollArea>
    </Container>
  )
}

export default Messages
