// Write your code here
// Write your code here
import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Navbar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value
      const navContainerClassName = !isDarkTheme
        ? 'nav-container'
        : 'nav-container dark-bg'

      const homeHeading = !isDarkTheme ? 'heading' : 'heading color'

      const onClickDark = () => {
        toggleTheme()
      }

      return (
        <nav className={navContainerClassName}>
          {!isDarkTheme ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/website-logo-light-theme-img.png"
              alt="website logo"
              className="website-logo"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/website-logo-dark-theme-img.png"
              alt="website logo"
              className="website-logo"
            />
          )}
          <ul className="home-about-container">
            <Link to="/" className="link-item">
              {' '}
              <li className="list-item">
                <h1 className={homeHeading}>Home</h1>
              </li>
            </Link>
            <Link to="/about" className="link-item">
              {' '}
              <li className="list-item">
                <h1 className={homeHeading}>About</h1>
              </li>
            </Link>
          </ul>
          <button type="button" className="button" onClick={onClickDark}>
            {!isDarkTheme ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
                alt="theme"
                className="website-theme"
              />
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
                alt="theme"
                className="website-theme"
              />
            )}
          </button>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default Navbar
