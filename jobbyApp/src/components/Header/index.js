import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <Link to="/" className="job-home-link">
        <li className="list-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo-2"
            alt="website logo"
          />
        </li>
      </Link>
      <ul className="nav-items-container">
        <Link to="/" className="link-item">
          <li className="list-item">
            <h1 className="nav-heading">Home</h1>
          </li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="list-item">
            <h1 className="nav-heading">Jobs</h1>
          </li>
        </Link>
      </ul>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
