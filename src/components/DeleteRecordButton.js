import React from 'react'
import { Button } from 'semantic-ui-react'

class DeleteRecordButton extends React.Component {

  handleClick = () => {
    this.props.deleteRecord(this.props.recordId)
  }

  render(){
    return(
      <Button floated='right' id="deletebutton" onClick={this.handleClick}>
        Delete File
      </Button>
    )
  }
}

export default DeleteRecordButton
