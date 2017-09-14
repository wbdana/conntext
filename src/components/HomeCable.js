import React from 'react'

class HomeCable extends React.Component {

  componentDidMount() {
    this.props['data-cableApp'].user = this.props['data-cableApp'].cable.subscriptions.create({channel: "UserChannel", room: this.props.userId}, {
      received: (data) => {
        this.props.updateWSContent(data)
        this.props.updateHomeWSContent(data)
      }
    })
  }

  render() {
    return(
      <div />
    )
  }


}

export default HomeCable
