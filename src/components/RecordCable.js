import React from 'react'

class RecordCable extends React.Component {


  componentDidMount() {
    console.log(this.props['data-recordId'])
    console.log(window.location.href.match(/\d+$/))
    if (window.location.href.match(/\d+$/) !== null) {
      this.props['data-cableApp'].record = this.props['data-cableApp'].cable.subscriptions.create({channel: "RecordChannel", room: window.location.href.match(/\d+$/)[0]}, {
        received: (record) => {
          console.log(record)
          this.props.updateWSContent(record)
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
