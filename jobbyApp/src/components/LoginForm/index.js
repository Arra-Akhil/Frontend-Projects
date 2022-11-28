import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameContainer = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label htmlFor="username" className="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-element"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordContainer = () => {
    const {password} = this.state
    return (
      <div className="password-container">
        <label htmlFor="password" className="username">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-element"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showSubmitError, errorMsg} = this.state
    console.log(errorMsg)
    return (
      <div className="bg-container">
        <div className="credentials-container">
          <p className="username">username: rahul</p>
          <p className="username">password: rahul@2021</p>
        </div>
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="jobby-icon-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-logo"
              />
            </div>
            {this.renderUsernameContainer()}
            {this.renderPasswordContainer()}
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
