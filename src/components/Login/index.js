import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  changeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onLoginSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.ok === true) {
      this.onLoginSuccess()
    }
  }

  render() {
    const {username, password} = this.state
    return (
      <div className="login-page-bg-image">
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <h1 className="login-name">Login </h1>
            <div className="login-username-container">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={this.changeUsername}
              />
            </div>
            <div className="login-password-container">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
