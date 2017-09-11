import React from 'react'
import { Button } from 'semantic-ui-react'

class DeletePartnerButton extends React.Component {

  handleClick = () => {
    this.props.deletePartner(this.props.userId, this.props.recordId)
  }

  render(){
    return(
      <Button floated='right' id='deletepartnerbutton' onClick={this.handleClick} color='grey'>
        <Button.Content>
          Remove Partner
        </Button.Content>
      </Button>
    )
  }
}

export default DeletePartnerButton
