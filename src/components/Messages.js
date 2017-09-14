import React from 'react'
import ReactDOM from 'react-dom'
import { Container, List } from 'semantic-ui-react'
import ScrollArea from 'react-scrollbar'

class Messages extends React.Component {

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd)
    node.scrollIntoView({ behavior: "smooth" })
  }

  componentDidMount(){
    this.scrollToBottom()
    console.log('Should have worked!')
  }

  componentDidUpdate(){
    this.scrollToBottom()
  }

  render() {
    return(
      <Container className="messages">
        <ScrollArea speed={0.8} className="area" contentClassName="content" horizontal={false} onChange={this.handleChange}>
          <List celled animated>
            {this.props.messages.map( (message, index) => {
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
}

export default Messages
