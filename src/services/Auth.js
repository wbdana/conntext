import { APIURL } from '../components/PageAssets'

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
    return fetch("http://localhost:3000/user_token", options)
      .then(resp => resp.json())
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
    return fetch("http://localhost:3000/api/v1/cu", options)
      .then(resp => resp.json())
  }
}

export default Auth
