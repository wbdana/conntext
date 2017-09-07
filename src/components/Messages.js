import React from 'react'
import { List } from 'semantic-ui-react'

const Messages = (props) => {

  return(
    <div className="messages">
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
    </div>
  )
}

export default Messages
