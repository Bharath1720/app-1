import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errMsg: '',
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

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_Token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  onLoginFailed = errMsg => {
    this.setState({
      showErrorMsg: true,
      errMsg,
    })
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
    //  console.log(data)
    //  console.log(response)
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailed(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_Token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showErrorMsg, errMsg} = this.state
    return (
      <div className="login-page-bg-image">
        <div className="logo-con">
          <img
            src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1656594712/Group_7399_wrvd0n.png"
            className="logo"
            alt="login website logo"
          />
        </div>
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <h1 className="login-name">Login </h1>
            <div className="login-username-container">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                placeholder="Enter Username"
                onChange={this.changeUsername}
              />
            </div>
            <div className="login-password-container">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            {showErrorMsg && <p className="error-msg">{errMsg}</p>}
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
