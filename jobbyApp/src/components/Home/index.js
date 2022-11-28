import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <div className="home-items-container">
        <h1 className="home-heading">
          Find The Job That Fits Your Life and Makes you Happy.
        </h1>
        <p className="home-paragraph">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="find-jobs-link">
          <button type="button" className="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
