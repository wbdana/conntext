import React from 'react'

class RecordCable extends React.Component {


  componentDidMount() {
    console.log(this.props['data-recordId'])
    console.log(window.location.href.match(/\d+$/))
    if (window.location.href.match(/\d+$/) !== null) {
      this.props['data-cableApp'].record = this.props['data-cableApp'].cable.subscriptions.create({channel: "RecordChannel", room: window.location.href.match(/\d+$/)[0]}, {
        received: (data) => {
          console.log(data)
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
