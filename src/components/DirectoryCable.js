import React from 'react'

class DirectoryCable extends React.Component {

  componentDidMount() {
    console.log('Mounted DirectoryCable')
    this.props['data-cableApp'].users = this.props['data-cableApp'].cable.subscriptions.create({channel: "DirectoryChannel", room: 1}, {
      received: (data) => {
        console.log(data)
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
