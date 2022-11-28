// Write your code here
// Write your code here
import Navbar from '../Navbar'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Home = () => (
  <ThemeContext>
    {value => {
      const {isDarkTheme} = value
      const homeContainerClass = !isDarkTheme
        ? 'home-container'
        : 'home-container dark'

      const homeHeading = !isDarkTheme ? 'home-heading' : 'home-heading home'

      return (
        <>
          <Navbar />
          <div className={homeContainerClass}>
            {!isDarkTheme ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/home-light-img.png"
                alt="home"
                className="home-img"
              />
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/home-dark-img.png"
                alt="home"
                className="home-img"
              />
            )}
            <h1 className={homeHeading}>Home</h1>
          </div>
        </>
      )
    }}
  </ThemeContext>
)

export default Home
