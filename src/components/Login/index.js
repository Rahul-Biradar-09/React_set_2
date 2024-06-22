import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: ''}

  navigateToHome = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  verifyUsersDetails = async () => {
    const {username, password} = this.state
    const info = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(info),
    }
    const api = 'https://apis.ccbp.in/login'
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      this.navigateToHome(data.jwt_token)
      this.setState({errorMessage: ''})
    } else {
      this.setState({errorMessage: `*${data.error_msg}`})
    }
  }

  userDetails = event => {
    event.preventDefault()
    this.verifyUsersDetails()
  }

  usernameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="Bg-container">
        <div className="Login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image"
          />
          <form className="form-container" onSubmit={this.userDetails}>
            <label htmlFor="input1" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="input1"
              className="input"
              placeholder="Username"
              onChange={this.usernameInput}
              value={username}
            />
            <label htmlFor="input2" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="input2"
              className="input"
              placeholder="Password"
              onChange={this.passwordInput}
              value={password}
            />
            <button type="submit" className="button">
              Login
            </button>
            <p className="error-message">{errorMessage}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
