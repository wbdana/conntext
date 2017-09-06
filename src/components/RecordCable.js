import React from 'react'

class RecordCable extends React.Component {

  componentDidMount() {
    if (this.props['data-cableApp']) {
      this.props['data-cableApp'].record = this.props['data-cableApp'].cable.subscriptions.create({channel: "RecordChannel", room: this.props.recordId}, {
        received: (data) => {
          console.log(data)
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
