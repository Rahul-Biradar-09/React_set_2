import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const HomeButton = () => {
    history.push('/')
  }

  const logoutButton = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="C1">
        <button type="button" className="jobby-button" onClick={HomeButton}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="jobby-image"
          />
        </button>
        <div className="text-container">
          <Link to="/">
            <button type="button" className="nav-text">
              Home
            </button>
          </Link>
          <Link to="/jobs">
            <button type="button" className="nav-text">
              Jobs
            </button>
          </Link>
        </div>
      </div>
      <button type="button" className="logout-button" onClick={logoutButton}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
