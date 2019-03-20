class Auth {
  static login(loginParams) {
    const options = {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": localStorage.getItem('jwt')
      },
      "body": JSON.stringify(loginParams)
    }
    return fetch("https://conntext-api.herokuapp.com/user_token", options)
      .then(resp => {
        if (resp.status === 404) {
          alert('Failed to login - double check your username and password.')
        }
        return resp.json()
      })
  }

  static currentUser () {
    const options = {
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": localStorage.getItem('jwt')
      }
    }
    return fetch("https://conntext-api.herokuapp.com/api/v1/cu", options)
      .then(resp => resp.json())
  }
}

export default Auth
