// Write your code here
// Write your code here
import Navbar from '../Navbar'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const About = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const aboutContainerClass = !isDarkTheme
        ? 'about-container'
        : 'about-container dark'

      const aboutHeading = !isDarkTheme
        ? 'about-heading'
        : 'about-heading color'

      return (
        <>
          <Navbar />
          <div className={aboutContainerClass}>
            {!isDarkTheme ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/about-light-img.png"
                alt="about"
                className="about-img"
              />
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/about-dark-img.png"
                alt="about"
                className="about-img"
              />
            )}
            <h1 className={aboutHeading}>About</h1>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default About
