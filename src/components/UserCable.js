import React from 'react'

class UserCable extends React.Component {

  componentDidMount() {
    this.props['data-cableApp'].user = this.props['data-cableApp'].cable.subscriptions.create({channel: "UserChannel", room: window.location.href.match(/\d+$/)[0]}, {
      received: (data) => {
        console.log(data)
        this.props.updateWSContent(data)
        this.props.updateUserShowPageWSContent(data)
      }
    })
  }

  render() {
    return(
      <div />
    )
  }


}

export default UserCable
