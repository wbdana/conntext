import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

class AddPartnerForm extends React.Component {
  state = {
    partnerName: '',
    fileId: this.props.fileId
  }


  updatePartnerName = (event, data) => {
    this.setState({
      partnerName: data.value
    })
  }

  handleSubmit = () => {
    this.props.addPartner(this.state.partnerName, this.props.fileId)
    this.setState({
      partnerName: ''
    })
  }

  render() {
    return(
      <div className="addPartnerForm">
        <Form onSubmit={this.handleSubmit}>
          <Input type='text' placeholder='Add collaborator' onChange={this.updatePartnerName} value={this.state.partnerName} />
          <Button floated="right" basic color='blue' type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default AddPartnerForm
