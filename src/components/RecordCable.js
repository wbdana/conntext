import React from 'react'

class RecordCable extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      recordId: this.props.recordId
    }
  }

  componentDidMount() {
    if (this.props['data-cableApp']) {
      this.props['data-cableApp'].record = this.props['data-cableApp'].cable.subscriptions.create({channel: "RecordChannel", room: this.props.recordId}, {
        received: (data) => {
          this.props.updateWSContent(data)
        }
      })
    }
  }


  render() {
    return(
      <div />
    )
  }
}

export default RecordCable
