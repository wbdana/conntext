import React from 'react'

class RecordCable extends React.Component {


  componentDidMount() {
    if (window.location.href.match(/\d+$/) !== null) {
      this.props['data-cableApp'].record = this.props['data-cableApp'].cable.subscriptions.create({channel: "RecordChannel", room: window.location.href.match(/\d+$/)[0]}, {
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
