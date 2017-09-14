import React from 'react'

class DirectoryCable extends React.Component {

  componentDidMount() {
    this.props['data-cableApp'].users = this.props['data-cableApp'].cable.subscriptions.create({channel: "DirectoryChannel", room: 1}, {
      received: (data) => {
        this.props.updateWSContent(data)
        this.props.updateUserDirectory(data)
      }
    })}

    render() {
      return(
        <div />
      )
    }
}

export default DirectoryCable
