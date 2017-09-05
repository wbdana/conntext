import React from 'react'
import { Button } from 'semantic-ui-react'

class DeleteRecordButton extends React.Component {
  state = {
    recordId: this.props.recordId
  }

  handleClick = () => {
    this.props.deleteRecord(this.state.recordId)
  }

  render(){
    return(
      <Button onClick={this.handleClick}>
        Delete File!
      </Button>
    )
  }
}

export default DeleteRecordButton
