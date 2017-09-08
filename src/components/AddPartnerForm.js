import React from 'react'
import { Form, Input } from 'semantic-ui-react'

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
    this.props.addPartner(this.state.partnerName, this.state.fileId)
  }

  render() {
    return(
      <div className="addPartnerForm">
        <Form onSubmit={this.handleSubmit}>
          <Input type='text' placeholder='Add collaborator name' onChange={this.updatePartnerName} />
          <Input type='submit' />
        </Form>
      </div>
    )
  }
}

export default AddPartnerForm
